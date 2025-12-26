import { PaymentMethod } from "../../enums/paymentMethod";
import { PaymentStatus } from "../../enums/paymentStatus";

export interface SuperAdminPaymentEntity {
  id?: string;
  gymId: string;
  packageId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  status: PaymentStatus;
  createdAt?: Date;
}
