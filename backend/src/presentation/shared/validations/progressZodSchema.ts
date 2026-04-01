import { z } from "zod";
import { ProgressWeightUnit } from "../../../domain/enums/progressWeightUnit";
import { ProgressError } from "../constants/messages/progressMassages";

export const CreateProgressSchema = z.object({
  weight: z.object({
    value: z
      .number({
        message: ProgressError.INVALID_WEIGHT,
      })
      .gt(0, {
        message: ProgressError.INVALID_WEIGHT_VALUE,
      }),

    unit: z.enum(ProgressWeightUnit, {
      message: ProgressError.INVALID_WEIGHT_UNIT,
    }),
  }),

  bodyFatPercentage: z
    .number({
      message: ProgressError.INVALID_BODY_FAT,
    })
    .min(0, {
      message: ProgressError.INVALID_BODY_FAT,
    })
    .max(100, {
      message: ProgressError.INVALID_BODY_FAT,
    })
    .optional(),

  muscleMass: z
    .object({
      value: z
        .number({
          message: ProgressError.INVALID_MUSCLE_MASS,
        })
        .gt(0, {
          message: ProgressError.INVALID_MUSCLE_MASS,
        }),

      unit: z.enum(ProgressWeightUnit, {
        message: ProgressError.INVALID_MUSCLE_MASS_UNIT,
      }),
    })
    .optional(),

  note: z
    .string()
    .max(500, {
      message: ProgressError.INVALID_NOTE,
    })
    .optional(),
});

export const UpdateProgressSchema = z.object({
  weight: z
    .object({
      value: z
        .number({
          message: ProgressError.INVALID_WEIGHT,
        })
        .gt(0, {
          message: ProgressError.INVALID_WEIGHT_VALUE,
        }),

      unit: z.enum(ProgressWeightUnit, {
        message: ProgressError.INVALID_WEIGHT_UNIT,
      }),
    })
    .optional(),

  bodyFatPercentage: z
    .number({
      message: ProgressError.INVALID_BODY_FAT,
    })
    .min(0, {
      message: ProgressError.INVALID_BODY_FAT,
    })
    .max(100, {
      message: ProgressError.INVALID_BODY_FAT,
    })
    .optional(),

  muscleMass: z
    .object({
      value: z
        .number({
          message: ProgressError.INVALID_MUSCLE_MASS,
        })
        .gt(0, {
          message: ProgressError.INVALID_MUSCLE_MASS,
        }),

      unit: z.enum(ProgressWeightUnit, {
        message: ProgressError.INVALID_MUSCLE_MASS_UNIT,
      }),
    })
    .optional(),

  note: z
    .string()
    .max(500, {
      message: ProgressError.INVALID_NOTE,
    })
    .optional(),
});
