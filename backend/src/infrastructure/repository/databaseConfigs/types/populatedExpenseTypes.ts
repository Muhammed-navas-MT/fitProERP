import { ExpencseCreateModel } from "../../../../domain/enums/expenseCreateModel";
import { ExpenseType } from "../../../../domain/enums/expenseType";
import { PaymentMethod } from "../../../../domain/enums/paymentMethod";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";

export interface IPopulatedBranch {
  branchName: string;
  city: string;
  pincode: string;
}

export interface IPopulatedExpense {
  id: string;
  branch: IPopulatedBranch;
  expenseType: ExpenseType;
  description?: string;
  createdBy: {
    name: string;
    email: string;
    model: ExpencseCreateModel;
  };
  amount: number;
  paymentMethod: PaymentMethod;
  paymentDate: Date;
  status: PaymentStatus;
  createdAt: Date;
}

export interface MonthlyExpenseSummary {
  month: string;
  Rent: number;
  Utilities: number;
  Maintenance: number;
  Equipment: number;
  Marketing: number;
  TrainerCommission: number;
  Other: number;
}
