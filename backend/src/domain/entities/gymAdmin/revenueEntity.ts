import { RevenueSourceType } from "../../enums/gymRevenueSourceType";
import { PaymentMethod } from "../../enums/paymentMethod";
import { PaymentStatus } from "../../enums/paymentStatus";

export interface IGymAdminRevenueEntity {
  id?: string;
  gymId: string;
  branchId:string;
  userId:string;
  sourceType:RevenueSourceType;
  sourceId: string;
  source:string;
  stripeSessionId: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  createdAt?: Date;
}
