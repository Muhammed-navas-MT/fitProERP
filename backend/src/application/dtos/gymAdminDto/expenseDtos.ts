import { ExpencseCreateModel } from "../../../domain/enums/expenseCreateModel";
import { ExpenseType } from "../../../domain/enums/expenseType";
import { PaymentMethod } from "../../../domain/enums/paymentMethod";
import { PaymentStatus } from "../../../domain/enums/paymentStatus";
import { MonthlyExpenseSummary } from "../../../infrastructure/repository/databaseConfigs/types/populatedExpenseTypes";

export interface ICreateExpenseRequestDto {
  branchId: string;
  expenseType: ExpenseType;
  description?: string;
  createdBy: string;
  createdByModel: ExpencseCreateModel;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentDate: Date;
}

export interface IExpenseDetailResponseDto {
  id: string;
  branch: {
    branchName: string;
    city: string;
    pincode: string;
  };
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

export interface IListExpenseRequestDto {
  search: string;
  expenseType: string;
  limit: number;
  page: number;
  gymId: string;
}

export interface IListExpenseResponseDto {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  search: string;
  expense: IExpenseDetailResponseDto[];
  expenseSummary: MonthlyExpenseSummary[];
  thisMonthTotalExpense: number;
  grandTotal: number;
}

export interface IUpdateExpenseRequestDto {
  branchId?: string;
  expenseType?: ExpenseType;
  description?: string;
  amount?: number;
  paymentMethod?: PaymentMethod;
  paymentDate?: Date;
  status?: PaymentStatus;
}

export interface IExpenseResponseDto {
  id: string;
  branchId: string;
  expenseType: ExpenseType;
  description?: string;
  createdBy: string;
  amount: number;
  status: PaymentStatus;
  paymentDate: Date;
}
