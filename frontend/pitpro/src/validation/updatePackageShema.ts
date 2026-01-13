import { z } from "zod"

export const updatePackageSchema = z.object({
  branchId: z
    .string()
    .min(1, "Branch ID is required")
    .optional(),

  name: z
    .string()
    .min(3, "Package name must be at least 3 characters")
    .max(100, "Package name must not exceed 100 characters")
    .optional(),

  price: z
    .number()
    .positive("Price must be greater than 0")
    .optional(),

  durationInDays: z
    .number()
    .int("Duration must be a whole number")
    .positive("Duration must be greater than 0")
    .optional(),

  features: z
    .array(
      z.string().min(1, "Feature cannot be empty")
    )
    .min(1, "At least one feature is required")
    .optional(),

  isDailySession: z
    .boolean()
    .optional(),
})
