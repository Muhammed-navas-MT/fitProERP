import { Document, model } from "mongoose";
import { ProfitSchema } from "../schemas/gymAdminProfitSchema";

export interface IGymAdminProfitModel extends Document {
  _id: string;
  gymId: string;
  branchId: string;

  totalRevenue: number;
  totalExpense: number;
  netProfit: number;

  revenueCount: number;
  expenseCount: number;

  periodStart: Date;
  periodEnd: Date;

  createdAt?: Date;
}

export const gymAdminProfitModel = model<IGymAdminProfitModel>(
  "GymAdminProfit",
  ProfitSchema,
);
