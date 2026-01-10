import { z } from "zod"
import { GymAdminAuthError } from "../constants/errorMessage/gymAdminAuthError"

export const updateGymAdminProfileSchema = z.object({
  ownerName: z
    .string({ error: GymAdminAuthError.OWNER_NAME_INVALID_TYPE })
    .min(2, { error: GymAdminAuthError.OWNER_NAME_TOO_SHORT })
    .max(50, { error: GymAdminAuthError.OWNER_NAME_TOO_LONG })
    .regex(/^[a-zA-Z\s.]+$/, { error: GymAdminAuthError.OWNER_NAME_INVALID_CHARACTERS })
    .transform((val) => val.trim())
    .optional(),

  tagline: z
    .string({ error: GymAdminAuthError.TAGLINE_INVALID_TYPE })
    .max(100, { error: GymAdminAuthError.TAGLINE_TOO_LONG })
    .transform((val) => val.trim())
    .optional(),

  description: z
    .string({ error: GymAdminAuthError.DESCRIPTION_INVALID_TYPE })
    .max(500, { error: GymAdminAuthError.DESCRIPTION_TOO_LONG })
    .transform((val) => val.trim())
    .optional(),

  phone: z
    .string({ error: GymAdminAuthError.PHONE_INVALID_TYPE })
    .regex(
      /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/,
      { error: GymAdminAuthError.PHONE_INVALID_FORMAT }
    )
    .min(10, { error: GymAdminAuthError.PHONE_TOO_SHORT })
    .transform((val) => val.trim())
    .optional(),

  logo: z
    .union([
      z.string().url({ message: GymAdminAuthError.LOGO_INVALID_URL }),
      z.any(),
    ])
    .optional(),
})
