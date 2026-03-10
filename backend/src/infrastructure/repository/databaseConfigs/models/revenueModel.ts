import { Document, model } from "mongoose";
import { PaymentMethod } from "../../../../domain/enums/paymentMethod";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";
import { RevenueSchema } from "../schemas/revenueSchema";
import { RevenueSourceType } from "../../../../domain/enums/gymRevenueSourceType";

export interface IGymAdminRevenueModel extends Document {
  _id: string;
  gymId: string;
  branchId: string;
  userId: string;
  sourceType: RevenueSourceType;
  sourceId: string;
  source: string;
  amount: number;
  stripeSessionId: string;
  paymentMethod: PaymentMethod;
  currency: string;
  status: PaymentStatus;
  createdAt: Date;
}

export const gymAdminRevenueModel = model<IGymAdminRevenueModel>(
  "GymAdminRevenue",
  RevenueSchema,
);
