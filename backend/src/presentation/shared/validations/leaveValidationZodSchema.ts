import { z } from "zod";
import { LeaveError } from "../constants/messages/leaveMessages";

export const CreateLeaveSchema = z
  .object({
    startDate: z.coerce.date({
      error: LeaveError.START_DATE_REQUIRED,
    }),

    endDate: z.coerce.date({
      error: LeaveError.END_DATE_REQUIRED,
    }),

    reason: z.string().trim().min(3, LeaveError.REASON_REQUIRED),
  })
  .superRefine((data, ctx) => {
    if (data.endDate < data.startDate) {
      ctx.addIssue({
        path: ["endDate"],
        message: LeaveError.INVALID_DATE_RANGE,
        code: z.ZodIssueCode.custom,
      });
    }
  });
