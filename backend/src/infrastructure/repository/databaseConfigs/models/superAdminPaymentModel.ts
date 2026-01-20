import { Document, model } from "mongoose";
import { PaymentMethod } from "../../../../domain/enums/paymentMethod";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";
import { PaymentSchema } from "../schemas/superAdminPaymentSchema";

export interface ISuperAdminPaymentModel extends Document {
  _id: string;
  gymId: string;
  packageId: string;
  amount: number;
  stripeSessionId: string;
  paymentMethod: PaymentMethod;
  currency: string;
  status: PaymentStatus;
  createdAt: Date;
}

export const paymentModel = model<ISuperAdminPaymentModel>(
  "SuperAdminPayment",
  PaymentSchema
);
