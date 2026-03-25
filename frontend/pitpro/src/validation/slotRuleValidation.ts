import { z } from "zod";

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export const slotSchema = z
  .object({
    startTime: z.string().min(1, "Start time required"),
    endTime: z.string().min(1, "End time required"),
    amount: z.number().min(1, "Amount must be greater than 0"),
  })
  .superRefine((slot, ctx) => {
    const start = timeToMinutes(slot.startTime);
    const end = timeToMinutes(slot.endTime);

    if (end <= start) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endTime"],
        message: "End time must be greater than start time",
      });
    }
  });

export const createSlotRuleSchema = z
  .object({
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    isActive: z.boolean(),
    slots: z
      .array(slotSchema)
      .min(1, "At least one slot required")
      .max(5, "Max 5 slots allowed"),
  })
  .superRefine((data, ctx) => {
    if (data.endDate) {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);

      if (endDate < startDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["endDate"],
          message: "End date must be greater than or equal to start date",
        });
      }
    }

    const sortedSlots = [...data.slots]
      .map((slot, index) => ({
        ...slot,
        index,
        start: timeToMinutes(slot.startTime),
        end: timeToMinutes(slot.endTime),
      }))
      .sort((a, b) => a.start - b.start);

    for (let i = 0; i < sortedSlots.length - 1; i++) {
      const current = sortedSlots[i];
      const next = sortedSlots[i + 1];

      if (current.end > next.start) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["slots", next.index, "startTime"],
          message: "This slot overlaps with another session",
        });

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["slots", current.index, "endTime"],
          message: "This slot overlaps with another session",
        });
      }
    }
  });