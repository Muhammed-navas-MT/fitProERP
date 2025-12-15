import { z } from "zod";

export type UserRole = "MEMBER" | "TRAINER" | "GYMADMIN" | "SUPERADMIN";
const fileSchema =  z.file().mime(["image/jpeg", "image/png", "image/svg+xml", "image/webp"]).max(5 * 1024 * 1024,"File must be under 5 MB")

export const step1Schema = z
  .object({
    ownerName: z
      .string({ error: "Owner name must be a string" })
      .min(2, { error: "Owner name is too short" })
      .max(50, { error: "Owner name is too long" })
      .regex(/^[a-zA-Z\s.]+$/, {
        error: "Owner name contains invalid characters",
      })
      .transform((val) => val.trim()),

    email: z
      .string({ error: "Email must be a string" })
      .email({ error: "Email format is invalid" })
      .toLowerCase()
      .transform((val) => val.trim()),

    phone: z
      .string({ error: "Phone number must be a string" })
      .regex(
        /^[1-9][0-9]{9}$/,
        { error: "Phone number is invalid format" }
      )
      .min(10, { error: "Phone number is too short" })
      .transform((val) => val.trim()),

    password: z
      .string({ error: "Password must be a string" })
      .min(8, { error: "Password must be at least 8 characters" })
      .max(128, { error: "Password is too long" })
      .regex(/[A-Z]/, {
        error: "Password must include at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        error: "Password must include at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        error: "Password must include at least one number",
      })
      .regex(/[^A-Za-z0-9]/, {
        error: "Password must include at least one special character",
      }),

    confirmPassword: z.string({
      error: "Confirm password must be a string",
    }),

    role: z.enum(["MEMBER", "TRAINER", "GYMADMIN", "SUPERADMIN"], {
      error: "Invalid role",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });



export const step2Schema = z.object({
  gymName: z
    .string({ error: "Gym name must be a string" })
    .min(3, { error: "Gym name is too short" })
    .max(100, { error: "Gym name is too long" })
    .regex(/^[a-zA-Z\s]+$/, {
      error: "Gym name contains invalid characters",
    })
    .transform((val) => val.trim()),

  tagline: z
    .string({ error: "Tagline must be a string" })
    .min(3, { error: "Tagline is too short" })
    .transform((val) => val.trim()),

  description: z
    .string({ error: "Description must be a string" })
    .min(10, { error: "Description is too short" })
    .transform((val) => val.trim()),

  logo: fileSchema,
});


export const step3Schema = z.object({
  businessLicense: fileSchema,
  insuranceCertificate: fileSchema,
});

