import { ExpenseType } from "@/constants/expenseTypes";
import { PaymentMethod } from "@/types/paymentMethod";
import { z } from "zod";

export const expenseSchema = z
  .object({
    branchId: z.string().min(1, "Branch is required"),

    expenseType: z.enum(ExpenseType, {
      message: "Invalid expense type",
    }),

    description: z.string().optional(),

    amount: z
      .number({
        message: "Amount is required",
      })
      .positive("Amount must be greater than 0"),

    paymentMethod: z.enum(PaymentMethod, {
      message: "Invalid payment method",
    }),

    paymentDate: z.date().refine((date) => date <= new Date(), {
      message: "Payment date cannot be in the future",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.amount <= 0) {
      ctx.addIssue({
        path: ["amount"],
        message: "Amount must be greater than 0",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type ExpenseFormData = z.infer<typeof expenseSchema>;

export const updateExpenseSchema = z
  .object({
    branchId: z.string().optional(),

    expenseType: z
      .enum(ExpenseType, {
        message: "Invalid expense type",
      })
      .optional(),

    description: z.string().optional(),

    amount: z
      .number({
        message: "Invalid amount",
      })
      .positive("Amount must be greater than 0")
      .optional(),

    paymentMethod: z
      .enum(PaymentMethod, {
        message: "Invalid payment method",
      })
      .optional(),

    paymentDate: z
      .date()
      .refine((date) => date <= new Date(), {
        message: "Payment date cannot be in the future",
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.amount !== undefined && data.amount <= 0) {
      ctx.addIssue({
        path: ["amount"],
        message: "Amount must be greater than 0",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.paymentDate && data.paymentDate > new Date()) {
      ctx.addIssue({
        path: ["paymentDate"],
        message: "Payment date cannot be in the future",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type UpdateExpenseFormData = z.infer<typeof updateExpenseSchema>;
