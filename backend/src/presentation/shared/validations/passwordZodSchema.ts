import { z } from "zod";
import { Roles } from "../../../domain/enums/roles";
import { GymAdminAuthError } from "../constants/errorMessage/gymAdminAuthError";

export const changePasswordSchema = z.object({
  newPassword: z
    .string({ error: GymAdminAuthError.PASSWORD_INVALID_TYPE })
    .min(8, { error: GymAdminAuthError.PASSWORD_TOO_SHORT })
    .max(128, { error: GymAdminAuthError.PASSWORD_TOO_LONG })
    .regex(/[A-Z]/, { error: GymAdminAuthError.PASSWORD_NO_UPPERCASE })
    .regex(/[a-z]/, { error: GymAdminAuthError.PASSWORD_NO_LOWERCASE })
    .regex(/[0-9]/, { error: GymAdminAuthError.PASSWORD_NO_NUMBER })
    .regex(/[^A-Za-z0-9]/, { error: GymAdminAuthError.PASSWORD_NO_SPECIAL }),
});