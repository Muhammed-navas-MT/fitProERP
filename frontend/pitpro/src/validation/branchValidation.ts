import { z } from "zod";

const timeSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Time must be in HH:mm format");

export const branchSchema = z
  .object({
    branchName: z
      .string()
      .trim()
      .min(2, "Branch name must be at least 2 characters")
      .max(50, "Branch name cannot exceed 50 characters")
      .regex(
        /^[A-Za-z0-9\s&().'-]+$/,
        "Branch name contains invalid characters",
      ),

    phone: z
      .string()
      .trim()
      .regex(
        /^[6-9]\d{9}$/,
        "Phone number must be a valid 10-digit Indian mobile number",
      ),

    street: z
      .string()
      .trim()
      .min(3, "Street is required")
      .max(100, "Street cannot exceed 100 characters"),

    city: z
      .string()
      .trim()
      .min(2, "City is required")
      .max(50, "City cannot exceed 50 characters")
      .regex(/^[A-Za-z\s]+$/, "City can contain only letters and spaces"),

    state: z
      .string()
      .trim()
      .min(2, "State is required")
      .max(50, "State cannot exceed 50 characters")
      .regex(/^[A-Za-z\s]+$/, "State can contain only letters and spaces"),

    country: z
      .string()
      .trim()
      .min(2, "Country is required")
      .max(50, "Country cannot exceed 50 characters")
      .regex(/^[A-Za-z\s]+$/, "Country can contain only letters and spaces"),

    pincode: z
      .string()
      .trim()
      .regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),

    openTime: timeSchema,

    closeTime: timeSchema,
  })
  .superRefine((data, ctx) => {
    const [openHour, openMinute] = data.openTime.split(":").map(Number);
    const [closeHour, closeMinute] = data.closeTime.split(":").map(Number);

    const openMinutes = openHour * 60 + openMinute;
    const closeMinutes = closeHour * 60 + closeMinute;

    if (closeMinutes <= openMinutes) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["closeTime"],
        message: "Close time must be later than open time",
      });
    }
  });

export type BranchFormData = z.infer<typeof branchSchema>;
