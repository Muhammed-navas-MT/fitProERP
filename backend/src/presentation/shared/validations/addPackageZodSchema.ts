import { z } from "zod"

export const createPackageSchema = z.object({
  branchId: z
    .string()
    .min(1, "Branch ID is required"),

  name: z
    .string()
    .min(3, "Package name must be at least 3 characters")
    .max(100, "Package name must not exceed 100 characters"),

  price: z
    .number()
    .positive("Price must be greater than 0"),

  durationInDays: z
    .number()
    .int("Duration must be a whole number")
    .positive("Duration must be greater than 0"),

  features: z
    .array(
      z.string().min(1, "Feature cannot be empty")
    )
    .min(1, "At least one feature is required"),

  isDailySession: z
    .boolean(),
})
