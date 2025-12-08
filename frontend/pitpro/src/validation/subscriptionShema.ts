import { z } from "zod";

export const subscriptionSchema = z.object({
  planName: z
    .string()
    .min(3, "Plan name must be at least 3 characters")
    .max(50, "Plan name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed"),

  price: z
    .number()
    .nonnegative("Price cannot be negative")
    .min(9999, "Price must be 9999"),

  duration: z.string(),
  isActive:z.boolean(),

  features: z
    .array(
      z.object({
        description: z
          .string()
          .min(1, "Feature cannot be empty")
          .regex(/^(?=.*[a-zA-Z])[a-zA-Z0-9\s-]+$/, "Only letters, numbers, and hyphens allowed"),
      })
    )
    .nonempty("At least one feature is required")
    .refine(
      (items) => {
        const list = items.map((i) => i.description.trim().toLowerCase());
        return new Set(list).size === list.length;
      },
      { message: "Duplicate features are not allowed" }
    )
});

export type SubscriptionFormType = z.infer<typeof subscriptionSchema>;

export type FinalSubmissionType = Omit<SubscriptionFormType, 'features'> & {
  features: string[];
};