import { RevenueSourceType } from "../../enums/gymRevenueSourceType";
import { PaymentMethod } from "../../enums/paymentMethod";
import { PaymentStatus } from "../../enums/paymentStatus";
import { RefundStatus } from "../../enums/refundStatus";

export interface IGymAdminRevenueEntity {
  _id?: string;

  gymId: string;
  branchId: string;
  userId: string;

  sourceType: RevenueSourceType;
  sourceId: string;
  source: string;

  stripeSessionId: string;
  paymentIntentId: string;

  amount: number;
  currency: string;

  paymentMethod: PaymentMethod;

  status: PaymentStatus;

  refundId?: string;
  refundStatus?: RefundStatus;
  refundedAmount?: number;
  refundedAt?: Date;

  createdAt?: Date;
}
