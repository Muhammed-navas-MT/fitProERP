import { z } from "zod";

export const createProgressSchema = z.object({
  weight: z.object({
    value: z
      .number({ message: "Weight is required" })
      .gt(0, "Weight must be greater than 0"),
    unit: z.enum(["kg", "lbs"]),
  }),

  bodyFatPercentage: z
    .number()
    .min(0, "Body fat cannot be negative")
    .max(100, "Body fat cannot be greater than 100")
    .optional(),

  muscleMass: z
    .object({
      value: z
        .number()
        .gt(0, "Muscle mass must be greater than 0")
        .optional(),
      unit: z.enum(["kg", "lbs"]),
    })
    .optional(),

  note: z
    .string()
    .max(500, "Note must not exceed 500 characters")
    .optional(),
});

export type CreateProgressSchemaType = z.infer<typeof createProgressSchema>;