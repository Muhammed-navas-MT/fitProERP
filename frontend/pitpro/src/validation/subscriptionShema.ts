import { SubscriptionPlanName } from "@/constants/SubscriptionPlanName";
import { GymOwnerFeature } from "@/constants/gymOwnerFeature";
import { z } from "zod";

export const subscriptionSchema = z.object({
  planName: z.nativeEnum(SubscriptionPlanName, {
    errorMap: () => ({ message: "Please select a plan" }),
  }),

  price: z
    .number()
    .nonnegative("Price cannot be negative")
    .min(9999, "Price must be at least 9999"),

  duration: z.string(),

  isActive: z.boolean(),

  // Accept objects but validate against enum
  features: z
    .array(
      z.object({
        description: z.nativeEnum(GymOwnerFeature, {
          errorMap: () => ({ message: "Invalid feature selected" }),
        }),
      })
    )
    .nonempty("At least one feature is required")
    .refine(
      (items) => {
        const list = items.map((i) => i.description.toLowerCase());
        return new Set(list).size === list.length;
      },
      { message: "Duplicate features are not allowed" }
    ),

  limits: z.object({
    maxMembers: z.number().min(1, "Members must be at least 1"),
    maxTrainers: z.number().min(1, "Trainers must be at least 1"),
    maxBranches: z.number().min(1, "Branches must be at least 1"),
  }),
});

export type SubscriptionFormType = z.infer<typeof subscriptionSchema>;

export type FinalSubmissionType = Omit<
  SubscriptionFormType,
  "features"
> & {
  features: string[];
};
