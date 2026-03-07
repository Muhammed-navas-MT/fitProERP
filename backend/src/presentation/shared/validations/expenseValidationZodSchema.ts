import { z } from "zod";
import { ExpenseError } from "../constants/messages/expensemessages";
import { ExpenseType } from "../../../domain/enums/expenseType";
import { ExpencseCreateModel } from "../../../domain/enums/expenseCreateModel";
import { PaymentMethod } from "../../../domain/enums/paymentMethod";

export const ExpenseSchema = z.object({
  branchId: z.string().min(1, { message: ExpenseError.INVALID_BRANCH }),

  expenseType: z.enum(ExpenseType, {
    message: ExpenseError.INVALID_EXPENSE_TYPE,
  }),

  description: z.string().max(500).optional(),

  createdBy: z.string().min(1, { message: ExpenseError.INVALID_CREATOR }),

  createdByModel: z.enum(ExpencseCreateModel, {
    message: ExpenseError.INVALID_CREATOR,
  }),

  amount: z
    .number({ message: ExpenseError.INVALID_AMOUNT })
    .gt(0, { message: ExpenseError.INVALID_AMOUNT }),

  paymentMethod: z.enum(PaymentMethod, {
    message: ExpenseError.INVALID_PAYMENT_METHOD,
  }),

  paymentDate: z.coerce.date({
    message: ExpenseError.INVALID_PAYMENT_DATE,
  }),
});

export const ExpenseUpdateSchema = z.object({
  branchId: z
    .string()
    .min(1, { message: ExpenseError.INVALID_BRANCH })
    .optional(),

  expenseType: z
    .enum(ExpenseType, {
      message: ExpenseError.INVALID_EXPENSE_TYPE,
    })
    .optional(),

  description: z.string().max(500).optional(),

  amount: z
    .number({ message: ExpenseError.INVALID_AMOUNT })
    .gt(0, { message: ExpenseError.INVALID_AMOUNT })
    .optional(),

  paymentMethod: z
    .enum(PaymentMethod, {
      message: ExpenseError.INVALID_PAYMENT_METHOD,
    })
    .optional(),

  paymentDate: z.coerce
    .date({
      message: ExpenseError.INVALID_PAYMENT_DATE,
    })
    .optional(),
});
