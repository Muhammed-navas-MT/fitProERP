import { z } from "zod";

export const slotSchema = z.object({
  startTime: z.string().min(1, "Start time required"),
  endTime: z.string().min(1, "End time required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
});

export const createSlotRuleSchema = z.object({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  slots: z
    .array(slotSchema)
    .min(1, "At least one slot required")
    .max(5, "Max 5 slots allowed"),
});
