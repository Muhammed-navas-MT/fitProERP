import { z } from "zod";

const phoneRegex = /^[0-9]{7,15}$/;

export const UpdateMemberProfileSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(50)
      .optional(),

    phone: z
      .string()
      .trim()
      .regex(phoneRegex, "Invalid phone number")
      .optional(),

    address: z
      .string()
      .trim()
      .min(5)
      .max(200)
      .optional(),

    emergencyNumber: z
      .string()
      .trim()
      .regex(phoneRegex, "Invalid emergency contact number")
      .optional(),

    healthDetails: z
      .object({
        gender: z.enum(["male", "female", "other"]).optional(),

        dateOfBirth: z
          .preprocess(
            (val) => (val ? new Date(val as string) : undefined),
            z.date().max(new Date(), "DOB cannot be in the future")
          )
          .optional(),

        weight: z.string().regex(/^\d{2,3}(\.\d{1,2})?$/).optional(),
        height: z.string().regex(/^\d{2,3}(\.\d{1,2})?$/).optional(),
        targetWeight: z.string().regex(/^\d{2,3}(\.\d{1,2})?$/).optional(),

        medicalConditions: z.string().trim().max(300).optional(),
        allergies: z.string().trim().max(300).optional(),
        fitnessGoal: z.string().trim().max(100).optional(),
      })
      .optional(),
  })
  .strict()
  .refine(
    (data) =>
      !data.phone ||
      !data.emergencyNumber ||
      data.phone !== data.emergencyNumber,
    {
      message: "Phone number and emergency contact number must be different",
      path: ["emergencyNumber"], // attach error to this field
    }
  );
