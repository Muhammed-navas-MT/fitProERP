import { z } from "zod";
import { BranchError } from "../constants/messages/branchMessages";

const timeSchema = z
  .string()
  .regex(/^\d{2}:\d{2}$/, BranchError.INVALID_TIME)
  .refine((time) => {
    const [hour, minute] = time.split(":").map(Number);
    return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
  }, BranchError.INVALID_TIME_RANGE);

export const BranchSchema = z
  .object({
    branchName: z.string().min(2, BranchError.BRANCH_NAME_REQUIRED),

    phone: z.string().min(8, BranchError.PHONE_REQUIRED),

    openTime: timeSchema,
    closeTime: timeSchema,

    address: z.object({
      street: z.string().min(1, BranchError.STREET_REQUIRED),
      city: z.string().min(1, BranchError.CITY_REQUIRED),
      state: z.string().min(1, BranchError.STATE_REQUIRED),
      country: z.string().min(1, BranchError.COUNTRY_REQUIRED),
      pincode: z.string().min(4, BranchError.PINCODE_REQUIRED),
    }),
  })
  .superRefine((data, ctx) => {
    const [openHour, openMinute] = data.openTime.split(":").map(Number);
    const [closeHour, closeMinute] = data.closeTime.split(":").map(Number);

    const openMinutes = openHour * 60 + openMinute;
    const closeMinutes = closeHour * 60 + closeMinute;

    if (closeMinutes <= openMinutes) {
      ctx.addIssue({
        path: ["closeTime"],
        message: BranchError.CLOSE_TIME_MUST_BE_GREATER,
        code: z.ZodIssueCode.custom,
      });
    }
  });
