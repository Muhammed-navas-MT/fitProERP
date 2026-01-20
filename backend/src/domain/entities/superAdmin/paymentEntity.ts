import { PaymentMethod } from "../../enums/paymentMethod";
import { PaymentStatus } from "../../enums/paymentStatus";

export interface SuperAdminPaymentEntity {
  id?: string;
  gymId: string;
  packageId: string;
  stripeSessionId: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  createdAt?: Date;
}
