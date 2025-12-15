import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

const onlyLettersRegex = /^[A-Za-z\s]+$/;

export const trainerSignupSchema = z.object({
  gymId: objectIdSchema.optional(),

  branchId: objectIdSchema.optional(),

  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .regex(onlyLettersRegex, "Only letters are allowed in name"),

  email: z
    .string()
    .email("Invalid email address")
    .toLowerCase(),

  phone: z
    .string()
    .regex(/^[+]?[0-9]{10,15}$/, "Invalid phone number format")
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .refine(
      (val) => !val.startsWith("0"),
      "Phone number should not start with 0"
    ),

  address: z
    .string()
    .min(10, "Address must be at least 10 characters"),

  specialization: z
    .array(
      z
        .string()
        .min(2, "Specialization must be at least 2 characters")
        .regex(onlyLettersRegex, "Only letters are allowed in specialization")
    )
    .min(1, "At least one specialization is required")
    .refine(
      (arr) => new Set(arr).size === arr.length,
      "Specializations must be unique"
    ),

  experience: z
    .number({error:"Must be a number"})
    .int("Experience must be an integer")
    .min(0, "Experience cannot be negative"),

  baseSalary: z
    .number({error:"Must be a number"})
    .min(0, "Base salary cannot be negative"),

  commisionRate: z
    .number({error:"Must be a number"})
    .min(0, "Commission rate cannot be less than 0")
    .max(100, "Commission rate cannot be more than 100"),

  status: z
    .string()
    .min(1, "Status cannot be empty"),

  dutyTime: z
    .object({
      startTime: z.string().min(1, "Start time is required"),
      endTime: z.string().min(1, "End time is required"),
    })
    .refine(
      (t) => t.startTime < t.endTime,
      {
        message: "Start time must be before end time",
        path: ["endTime"],
      }
    ),
});

export type TrainerFormData = z.infer<typeof trainerSignupSchema>;
