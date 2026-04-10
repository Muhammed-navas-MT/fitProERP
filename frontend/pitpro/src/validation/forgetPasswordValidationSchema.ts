import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .min(1, "OTP is required")
    .regex(/^\d{4,6}$/, "OTP must be 4 to 6 digits"),
});

export const passwordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine(
    (data: { password: string; confirmPassword: string }) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

export type EmailFormValues = z.infer<typeof emailSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
export type PasswordFormValues = z.infer<typeof passwordSchema>;
