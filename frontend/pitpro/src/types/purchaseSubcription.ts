import { PaymentMethod } from "./paymentMethod";

export type PurchaseSubscriptionPayload = {
  packageId: string;
  amount: number;
  paymentMethod: PaymentMethod;
};