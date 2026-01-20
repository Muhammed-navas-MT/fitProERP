import { PaymentMethod } from "../../../domain/enums/paymentMethod";

export interface PurchaseSubscriptionDTO {
  gymId: string;
  packageId: string;
  amount: number;
  paymentMethod: PaymentMethod;
};

export interface CreateCheckoutSessionRequestDto{
  planId:string;
  userId :string;
}
