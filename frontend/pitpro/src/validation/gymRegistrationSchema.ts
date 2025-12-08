import { z } from "zod";

export type UserRole = "MEMBER" | "TRAINER" | "GYMADMIN" | "SUPERADMIN";
const fileSchema =  z.file().mime(["image/jpeg", "image/png", "image/svg+xml", "image/webp"]).max(5 * 1024 * 1024,"File must be under 5 MB")

export const step1Schema = z
  .object({
    ownerName: z.string().min(3, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.enum(["MEMBER", "TRAINER", "GYMADMIN", "SUPERADMIN"]),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


export const step2Schema = z.object({
  gymName: z.string().min(3, "Gym name is required"),
  tagline: z.string().min(3, "Tagline is required"),
  description: z.string().min(10, "Description is required"),
  logo: fileSchema,
});

export const step3Schema = z.object({
  businessLicense:fileSchema,
  insuranceCertificate:fileSchema,
});
