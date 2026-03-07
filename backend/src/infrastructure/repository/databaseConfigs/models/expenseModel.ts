import { Document, model } from "mongoose";
import { ExpenseSchema } from "../schemas/expenseSchema";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";
import { PaymentMethod } from "../../../../domain/enums/paymentMethod";
import { ExpenseType } from "../../../../domain/enums/expenseType";
import { ExpencseCreateModel } from "../../../../domain/enums/expenseCreateModel";

export interface IGymAdminExpenseModel extends Document {
  _id: string;
  gymId: string;
  branchId: string;
  expenseType: ExpenseType;
  description?: string;
  createdBy: string;
  createdByModel: ExpencseCreateModel;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentDate: Date;
  status: PaymentStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export const gymAdminExpenseModel = model<IGymAdminExpenseModel>(
  "GymAdminExpense",
  ExpenseSchema,
);
