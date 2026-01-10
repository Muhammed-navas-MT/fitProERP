import { z } from "zod"
import { MemberError } from "../constants/errorMessage/memberMessage"
import { Gender } from "../../../domain/enums/gender"

export const memberSignupSchema = z
  .object({
    trainerId: z
      .string({ error: MemberError.TRAINER_ID_INVALID })
      .regex(/^[0-9a-fA-F]{24}$/, {
        error: MemberError.TRAINER_ID_INVALID,
      })
      .transform((val) => val.trim()),

      branchId: z
      .string({ error: MemberError.BRANCH_ID_INVALID }),

    name: z
      .string({ error: MemberError.FIRST_NAME_INVALID_TYPE })
      .min(2, { error: MemberError.FIRST_NAME_TOO_SHORT })
      .regex(/^[a-zA-Z\s.'-]+$/, {
        error: MemberError.FIRST_NAME_INVALID_CHARACTERS,
      })
      .transform((val) => val.trim()),

    email: z
      .string({ error: MemberError.EMAIL_INVALID_TYPE })
      .email({ error: MemberError.EMAIL_INVALID_FORMAT })
      .toLowerCase()
      .transform((val) => val.trim()),

    phone: z
      .string({ error: MemberError.PHONE_INVALID_TYPE })
      .regex(
        /^[\+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
        { error: MemberError.PHONE_INVALID_FORMAT }
      )
      .min(10, { error: MemberError.PHONE_TOO_SHORT })
      .transform((val) => val.trim()),

    address: z
      .string({ error: MemberError.ADDRESS_INVALID_TYPE })
      .min(10, { error: MemberError.ADDRESS_TOO_SHORT })
      .transform((val) => val.trim()),

    emergencyNumber: z
      .string({ error: MemberError.EMERGENCY_NUMBER_INVALID_TYPE })
      .regex(
        /^[\+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
        { error: MemberError.EMERGENCY_NUMBER_INVALID_FORMAT }
      )
      .min(10, { error: MemberError.EMERGENCY_NUMBER_TOO_SHORT })
      .transform((val) => val.trim()),

    healthDetails: z.object({
      gender: z.enum(
        [Gender.MALE, Gender.FEMALE, Gender.OTHER],
        { error: MemberError.GENDER_INVALID }
      ),

      dateOfBirth: z
        .string({ error: MemberError.DATE_OF_BIRTH_INVALID_TYPE })
        .refine((date) => !isNaN(Date.parse(date)), {
          error: MemberError.DATE_OF_BIRTH_INVALID_TYPE,
        })
        .refine((date) => new Date(date) <= new Date(), {
          error: MemberError.DATE_OF_BIRTH_FUTURE,
        }),

      weight: z
        .number({ error: MemberError.WEIGHT_VALUE_INVALID_TYPE })
        .min(20, { error: MemberError.WEIGHT_VALUE_TOO_LOW })
        .max(500, { error: MemberError.WEIGHT_VALUE_TOO_HIGH }),

      height: z
        .number({ error: MemberError.HEIGHT_VALUE_INVALID_TYPE })
        .min(50, { error: MemberError.HEIGHT_VALUE_TOO_LOW })
        .max(300, { error: MemberError.HEIGHT_VALUE_TOO_HIGH }),

      targetWeight: z
        .number({ error: MemberError.TARGET_WEIGHT_VALUE_INVALID_TYPE })
        .min(20, { error: MemberError.TARGET_WEIGHT_VALUE_TOO_LOW })
        .max(500, { error: MemberError.TARGET_WEIGHT_VALUE_TOO_HIGH }),

      medicalConditions: z
        .string({ error: MemberError.MEDICAL_CONDITIONS_INVALID_TYPE })
        .optional()
        .transform((val) => val?.trim()),

      allergies: z
        .string({ error: MemberError.ALLERGIES_INVALID_TYPE })
        .optional()
        .transform((val) => val?.trim()),

      fitnessGoal: z
        .string({ error: MemberError.FITNESS_GOAL_INVALID_TYPE })
        .min(3, { error: MemberError.FITNESS_GOAL_TOO_SHORT })
        .transform((val) => val.trim()),
    }),
  })
  .refine((data) => data.phone !== data.emergencyNumber, {
    error: MemberError.EMERGENCY_NUMBER_SAME_AS_PHONE,
    path: ["emergencyNumber"],
  })
