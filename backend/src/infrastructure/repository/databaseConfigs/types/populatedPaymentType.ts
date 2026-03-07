import { Types } from "mongoose";
import { PaymentMethod } from "../../../../domain/enums/paymentMethod";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";

export interface IPopulatedGymAdmin {
  _id: Types.ObjectId;
  gymName: string;
  ownerName: string;
  email: string;
}

export interface IPopulatedPackage {
  _id: Types.ObjectId;
  planName: string;
}

export interface IPopulatedPayment {
  _id: Types.ObjectId;
  package: IPopulatedPackage;
  gym: IPopulatedGymAdmin;
  stripeSessionId: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  createdAt: Date;
}
