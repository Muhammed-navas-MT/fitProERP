import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");

const phoneSchema = z
  .string()
  .regex(
    /^[1-9][0-9]{9,}$/,
    "Phone number must be at least 10 digits and cannot start with 0"
  )
  .transform((val) => val.trim());

const dateSchema = z
  .string()
  .refine((date) => !isNaN(Date.parse(date)), "Invalid date format")
  .refine((date) => new Date(date) <= new Date(), "Date cannot be in the future")
  .refine((date) => {
    const dob = new Date(date);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age >= 10;
  }, "Age must be at least 10 years old");


export const memberSignupSchema = z
  .object({
    trainerId: objectIdSchema,

    branchId: z.string().min(1, "Branch ID is required"),

   name: z
  .string()
  .min(2, "Name is too short")
  .regex(/^[A-Za-z ]+$/, "Name can contain only letters and spaces")
  .transform((val) => val.trim()),

    email: z
      .string()
      .email("Invalid email format")
      .transform((val) => val.trim().toLowerCase()),

    phone: phoneSchema,

    address: z
      .string()
      .min(10, "Address is too short")
      .transform((val) => val.trim()),

    emergencyContact: phoneSchema,

    gender: z.enum(["MALE", "FEMALE", "OTHER"], { message: "Invalid gender" }),

    dateOfBirth: dateSchema,

    weight: z
      .number()
      .min(20, "Weight is too low")
      .max(500, "Weight is too high"),

    height: z
      .number()
      .min(50, "Height is too low")
      .max(300, "Height is too high"),

    targetWeight: z
      .number()
      .min(20, "Target weight is too low")
      .max(500, "Target weight is too high"),

    fitnessGoal: z
      .string()
      .min(3, "Fitness goal is too short")
      .transform((val) => val.trim()),
  })
  .superRefine((data, ctx) => {
    if (data.phone === data.emergencyContact) {
      ctx.addIssue({
        path: ["emergencyNumber"],
        message: "Emergency number must be different from phone number",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type MemberSignupFormData = z.infer<typeof memberSignupSchema>;
