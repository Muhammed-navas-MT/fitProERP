import { z } from "zod";
import { Roles } from "../../../domain/enums/roles";
import { GymAdminAuthError } from "../constants/errorMessage/gymAdminAuthError";

export const signupSchema = z.object({
  gymName: z
    .string({ error: GymAdminAuthError.GYM_NAME_INVALID_TYPE })
    .min(3, { error: GymAdminAuthError.GYM_NAME_TOO_SHORT })
    .max(100, { error: GymAdminAuthError.GYM_NAME_TOO_LONG })
    .regex(/^[a-zA-Z\s]+$/, { error: GymAdminAuthError.GYM_NAME_INVALID_CHARACTERS })
    .transform((val) => val.trim()),

  ownerName: z
    .string({ error: GymAdminAuthError.OWNER_NAME_INVALID_TYPE })
    .min(2, { error: GymAdminAuthError.OWNER_NAME_TOO_SHORT })
    .max(50, { error: GymAdminAuthError.OWNER_NAME_TOO_LONG })
    .regex(/^[a-zA-Z\s.]+$/, { error: GymAdminAuthError.OWNER_NAME_INVALID_CHARACTERS })
    .transform((val) => val.trim()),

  email: z
    .email({ error: GymAdminAuthError.EMAIL_INVALID_FORMAT })
    .toLowerCase()
    .transform((val) => val.trim()),

  phone: z
    .string({ error: GymAdminAuthError.PHONE_INVALID_TYPE })
    .regex(
      /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
      { error: GymAdminAuthError.PHONE_INVALID_FORMAT }
    )
    .min(10, { error: GymAdminAuthError.PHONE_TOO_SHORT })
    .transform((val) => val.trim()),

  password: z
    .string({ error: GymAdminAuthError.PASSWORD_INVALID_TYPE })
    .min(8, { error: GymAdminAuthError.PASSWORD_TOO_SHORT })
    .max(128, { error: GymAdminAuthError.PASSWORD_TOO_LONG })
    .regex(/[A-Z]/, { error: GymAdminAuthError.PASSWORD_NO_UPPERCASE })
    .regex(/[a-z]/, { error: GymAdminAuthError.PASSWORD_NO_LOWERCASE })
    .regex(/[0-9]/, { error: GymAdminAuthError.PASSWORD_NO_NUMBER })
    .regex(/[^A-Za-z0-9]/, { error: GymAdminAuthError.PASSWORD_NO_SPECIAL }),

  role: z
      .enum([Roles.GYMADMIN,Roles.MEMBER,Roles.SUPERADMIN,Roles.TRAINER],{
          error:GymAdminAuthError.ROLE_INVALID
      }),

  description: z
    .string({ error: GymAdminAuthError.DESCRIPTION_INVALID_TYPE })
    .transform((val) => val.trim()),

  tagline: z
    .string({ error: GymAdminAuthError.TAGLINE_INVALID_TYPE })
    .transform((val) => val.trim()),

  businessLicense: z
    .string({ error: GymAdminAuthError.BUSINESS_LICENSE_INVALID_TYPE })
    .url({ error: GymAdminAuthError.BUSINESS_LICENSE_INVALID_URL })
    .refine(
      (val) => {
        const validExtensions = [".pdf", ".jpg", ".jpeg", ".png"];
        return validExtensions.some((ext) => val.toLowerCase().endsWith(ext));
      },
      { error: GymAdminAuthError.BUSINESS_LICENSE_INVALID_FORMAT }
    ),

  insuranceCertificate: z
    .string({ error: GymAdminAuthError.INSURANCE_CERTIFICATE_INVALID_TYPE })
    .url({ error: GymAdminAuthError.INSURANCE_CERTIFICATE_INVALID_URL })
    .refine(
      (val) => {
        const validExtensions = [".pdf", ".jpg", ".jpeg", ".png"];
        return validExtensions.some((ext) => val.toLowerCase().endsWith(ext));
      },
      { error: GymAdminAuthError.INSURANCE_CERTIFICATE_INVALID_FORMAT }
    ),

  logo: z
    .string({ error: GymAdminAuthError.LOGO_INVALID_TYPE })
    .url({ error: GymAdminAuthError.LOGO_INVALID_URL })
    .refine(
      (val) => {
        const validExtensions = [".jpg", ".jpeg", ".png", ".svg", ".webp"];
        return validExtensions.some((ext) => val.toLowerCase().endsWith(ext));
      },
      { error: GymAdminAuthError.LOGO_INVALID_FORMAT }
    ),
});

export const signupWithConfirmPasswordSchema = signupSchema
  .extend({
    confirmPassword: z.string({ error: GymAdminAuthError.PASSWORD_INVALID_TYPE }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: GymAdminAuthError.PASSWORDS_DO_NOT_MATCH
  });

