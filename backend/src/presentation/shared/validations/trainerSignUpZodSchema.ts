import { z } from "zod";
import { TrainerError } from "../constants/errorMessage/trainerMessage";

export const trainerSignupSchema = z.object({
  gymId: z
    .string({ error: TrainerError.GYM_ID_INVALID })
    .regex(/^[0-9a-fA-F]{24}$/, { error: TrainerError.GYM_ID_INVALID })
    .transform((val) => val.trim()),

  // branchId: z
  //   .string({ error: TrainerError.BRANCH_ID_INVALID })
  //   .regex(/^[0-9a-fA-F]{24}$/, { error: TrainerError.BRANCH_ID_INVALID })
  //   .transform((val) => val.trim()),

  name: z
    .string({ error: TrainerError.NAME_INVALID_TYPE })
    .min(2, { error: TrainerError.NAME_TOO_SHORT })
    .regex(/^[a-zA-Z\s.''-]+$/, { error: TrainerError.NAME_INVALID_CHARACTERS })
    .transform((val) => val.trim()),

  email: z
    .string({ error: TrainerError.EMAIL_INVALID_TYPE })
    .email({ error: TrainerError.EMAIL_INVALID_FORMAT })
    .toLowerCase()
    .transform((val) => val.trim()),

  phone: z
    .string({ error: TrainerError.PHONE_INVALID_TYPE })
    .regex(
      /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
      { error: TrainerError.PHONE_INVALID_FORMAT }
    )
    .min(10, { error: TrainerError.PHONE_TOO_SHORT })
    .transform((val) => val.trim()),

  password: z
    .string({ error: TrainerError.PASSWORD_INVALID_TYPE })
    .min(8, { error: TrainerError.PASSWORD_TOO_SHORT })
    .regex(/[A-Z]/, { error: TrainerError.PASSWORD_NO_UPPERCASE })
    .regex(/[a-z]/, { error: TrainerError.PASSWORD_NO_LOWERCASE })
    .regex(/[0-9]/, { error: TrainerError.PASSWORD_NO_NUMBER })
    .regex(/[@$!%*?&#]/, { error: TrainerError.PASSWORD_NO_SPECIAL }),

  address: z
    .string({ error: TrainerError.ADDRESS_INVALID_TYPE })
    .min(10, { error: TrainerError.ADDRESS_TOO_SHORT })
    .transform((val) => val.trim()),

  specialization: z
    .array(
      z
        .string({ error: TrainerError.SPECIALIZATION_ITEM_INVALID })
        .min(2, { error: TrainerError.SPECIALIZATION_TOO_SHORT })
        .transform((val) => val.trim()),
      { error: TrainerError.SPECIALIZATION_INVALID_TYPE }
    )
    .min(1, { error: TrainerError.SPECIALIZATION_EMPTY })
    .refine((arr) => new Set(arr).size === arr.length, {
      error: TrainerError.SPECIALIZATION_DUPLICATE,
    }),

  experience: z
    .number({ error: TrainerError.EXPERIENCE_INVALID_TYPE })
    .int({ error: TrainerError.EXPERIENCE_NOT_INTEGER })
    .min(0, { error: TrainerError.EXPERIENCE_NEGATIVE }),
});

export const trainerSignupWithConfirmPasswordSchema = trainerSignupSchema
  .extend({
    confirmPassword: z.string({ error: TrainerError.PASSWORD_INVALID_TYPE }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: TrainerError.PASSWORDS_DO_NOT_MATCH,
  });