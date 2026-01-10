import { z } from "zod"

export const updateTrainerProfileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
  address: z
    .string()
    .min(5, "Address is too short"),
})

export type UpdateTrainerProfileInput = z.infer<
  typeof updateTrainerProfileSchema
>
