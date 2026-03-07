import { ExpencseCreateModel } from "../../enums/expenseCreateModel";
import { ExpenseType } from "../../enums/expenseType";
import { PaymentMethod } from "../../enums/paymentMethod";
import { PaymentStatus } from "../../enums/paymentStatus";

export interface IGymAdminExpenseEntity {
  id?: string;
  gymId: string;
  branchId: string;
  expenseType: ExpenseType;
  description?: string;
  createdBy: string;
  createdByModel: ExpencseCreateModel;
  amount: number;
  status: PaymentStatus;
  paymentDate: Date;
  paymentMethod: PaymentMethod;
  createdAt?: Date;
  updatedAt?: Date;
}
