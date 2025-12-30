import { z } from "zod";
import { TrainerError } from "../constants/errorMessage/trainerMessage";
import { Roles } from "../../../domain/enums/roles";
import { Status } from "../../../domain/enums/status";

const objectIdSchema = z
  .string({ error: TrainerError.ID_INVALID })
  .regex(/^[0-9a-fA-F]{24}$/, { error: TrainerError.ID_INVALID })
  .transform((val) => val.trim());

export const trainerSignupSchema = z.object({
  gymId: objectIdSchema,

  branchId: objectIdSchema.optional(),

  name: z
    .string({ error: TrainerError.NAME_INVALID_TYPE })
    .trim()
    .min(2, { error: TrainerError.NAME_TOO_SHORT })
    .regex(/^[a-zA-Z\s.'-]+$/, {
      error: TrainerError.NAME_INVALID_CHARACTERS,
    }),

  email: z
    .string({ error: TrainerError.EMAIL_INVALID_TYPE })
    .trim()
    .email({ error: TrainerError.EMAIL_INVALID_FORMAT })
    .toLowerCase(),

  phone: z
    .string({ error: TrainerError.PHONE_INVALID_TYPE })
    .trim()
    .regex(
      /^[+]?[0-9]{10,15}$/,
      { error: TrainerError.PHONE_INVALID_FORMAT }
    ),

  role: z.nativeEnum(Roles, {
    error: TrainerError.ROLE_INVALID,
  }),

  address: z
    .string({ error: TrainerError.ADDRESS_INVALID_TYPE })
    .trim()
    .min(10, { error: TrainerError.ADDRESS_TOO_SHORT }),

  specialization: z
    .array(
      z
        .string({ error: TrainerError.SPECIALIZATION_ITEM_INVALID })
        .trim()
        .min(2, { error: TrainerError.SPECIALIZATION_TOO_SHORT })
    )
    .min(1, { error: TrainerError.SPECIALIZATION_EMPTY })
    .refine((arr) => new Set(arr).size === arr.length, {
      error: TrainerError.SPECIALIZATION_DUPLICATE,
    }),

  experience: z
    .number({ error: TrainerError.EXPERIENCE_INVALID_TYPE })
    .int({ error: TrainerError.EXPERIENCE_NOT_INTEGER })
    .min(0, { error: TrainerError.EXPERIENCE_NEGATIVE }),

  baseSalary: z
    .number({ error: TrainerError.BASE_SALARY_INVALID_TYPE })
    .min(0, { error: TrainerError.BASE_SALARY_NEGATIVE }),

  commisionRate: z
  .number({ error: TrainerError.COMMISSION_RATE_INVALID_TYPE })
  .min(0, { error: TrainerError.COMMISSION_RATE_NEGATIVE })
  .max(100, { error: TrainerError.COMMISSION_RATE_TOO_HIGH })
  .refine(
    (val) => Number.isInteger(val * 100),
    { error: TrainerError.COMMISSION_RATE_INVALID_DECIMAL }
  ),

  status: z.nativeEnum(Status, {
    error: TrainerError.STATUS_INVALID,
  }),

  dutyTime: z.object({
    startTime: z
      .string({ error: TrainerError.DUTY_START_TIME_INVALID })
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        error: TrainerError.TIME_FORMAT_INVALID,
      }),

    endTime: z
      .string({ error: TrainerError.DUTY_END_TIME_INVALID })
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        error: TrainerError.TIME_FORMAT_INVALID,
      }),
  }).refine(
    (data) => data.startTime < data.endTime,
    { error: TrainerError.DUTY_TIME_INVALID_RANGE }
  ),
});
