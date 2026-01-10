import { z } from "zod"

export const updateGymAdminProfileSchema = z.object({
  ownerName: z
    .string()
    .min(2, { message: "Owner name must be at least 2 characters" })
    .max(50, { message: "Owner name must be at most 50 characters" })
    .regex(/^[a-zA-Z\s.]+$/, { message: "Owner name contains invalid characters" })
    .transform((val) => val.trim())
    .optional(),

  tagline: z
    .string()
    .max(100, { message: "Tagline must be at most 100 characters" })
    .transform((val) => val.trim())
    .optional(),

  description: z
    .string()
    .max(500, { message: "Description must be at most 500 characters" })
    .transform((val) => val.trim())
    .optional(),

 phone: z
  .string()
  .regex(
    /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/,
    { message: "Phone number is not valid" }
  )
  .min(10, { message: "Phone number must be at least 10 digits" })
  .transform((val) => val.trim())
  .optional(),

  logo: z
    .union([
      z.string().url({ message: "Logo must be a valid URL" }),
      z.any(),
    ])
    .optional(),
})

export type UpdateGymAdminProfileFormValues = z.infer<typeof updateGymAdminProfileSchema>
