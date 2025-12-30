import { z } from "zod"

const timeSchema = z
  .string()
  .regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:mm)")
  .refine((time) => {
    const [hour, minute] = time.split(":").map(Number)
    return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59
  }, "Invalid time range")

export const branchSchema = z
  .object({
    branchName: z.string().min(2, "Branch name is required"),

    phone: z.string().min(8, "Phone number is required"),

    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    pincode: z.string().min(4, "Pincode is required"),

    openTime: timeSchema,
    closeTime: timeSchema,
  })
  .superRefine((data, ctx) => {
    const [openHour, openMinute] = data.openTime.split(":").map(Number)
    const [closeHour, closeMinute] = data.closeTime.split(":").map(Number)

    const openMinutes = openHour * 60 + openMinute
    const closeMinutes = closeHour * 60 + closeMinute

    if (closeMinutes <= openMinutes) {
      ctx.addIssue({
        path: ["closeTime"],
        message: "Close time must be greater than open time",
        code: z.ZodIssueCode.custom,
      })
    }
  })

export type BranchFormData = z.infer<typeof branchSchema>
