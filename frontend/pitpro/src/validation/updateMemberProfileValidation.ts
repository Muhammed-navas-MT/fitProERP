import { z } from "zod";

const phoneRegex = /^[0-9]{7,15}$/;

export const UpdateMemberProfileSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name is too long")
      .optional()
      .or(z.literal("")),

    phone: z
      .string()
      .trim()
      .regex(phoneRegex, "Invalid phone number")
      .optional()
      .or(z.literal("")),

    address: z
      .string()
      .trim()
      .min(5, "Address must be at least 5 characters")
      .max(200, "Address is too long")
      .optional()
      .or(z.literal("")),

    emergencyNumber: z
      .string()
      .trim()
      .regex(phoneRegex, "Invalid emergency number")
      .optional()
      .or(z.literal("")),

    healthDetails: z
      .object({
        gender: z
          .string()
          .optional()
          .or(z.literal("")),

        dateOfBirth: z
          .string()
          .refine(
            (val) => !val || !isNaN(Date.parse(val)),
            "Invalid date"
          )
          .optional()
          .or(z.literal("")),

        weight: z
          .string()
          .regex(/^\d{2,3}(\.\d{1,2})?$/, "Invalid weight")
          .optional()
          .or(z.literal("")),

        height: z
          .string()
          .regex(/^\d{2,3}(\.\d{1,2})?$/, "Invalid height")
          .optional()
          .or(z.literal("")),

        targetWeight: z
          .string()
          .regex(/^\d{2,3}(\.\d{1,2})?$/, "Invalid target weight")
          .optional()
          .or(z.literal("")),

        medicalConditions: z
          .string()
          .trim()
          .max(300, "Too long")
          .optional()
          .or(z.literal("")),

        allergies: z
          .string()
          .trim()
          .max(300, "Too long")
          .optional()
          .or(z.literal("")),

        fitnessGoal: z
          .string()
          .trim()
          .max(100, "Fitness goal too long")
          .optional()
          .or(z.literal("")),
      })
      .optional(),
  })
  .refine(
    (data) =>
      !data.phone ||
      !data.emergencyNumber ||
      data.phone !== data.emergencyNumber,
    {
      message: "Phone number and emergency number must be different",
      path: ["emergencyNumber"],
    }
  );
export type UpdateMemberProfileFormValues = z.infer<
  typeof UpdateMemberProfileSchema
>;
