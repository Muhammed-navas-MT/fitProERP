import { Types } from "mongoose";
import { PaymentMethod } from "../../../../domain/enums/paymentMethod";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";
import { RevenueSourceType } from "../../../../domain/enums/gymRevenueSourceType";

export interface IPopulatedMember {
  name: string;
  email: string;
}

export interface IPopulatedBranch {
  branchName: string;
  address: {
    city: string;
    pincode: string;
  };
}

export interface IPopulatedRevenue {
  _id: Types.ObjectId;
  member: IPopulatedMember;
  branch: IPopulatedBranch;
  amount: number;
  source: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  createdAt: Date;
}

export interface SummaryType {
  sourceType: string;
  totalAmount: number;
  count: number;
}

export interface IPopulatedPayment {
  _id: string;
  source: string;
  sourceType: RevenueSourceType;
  sourceDetails: {
    planName?: string;
    duration?: string;
    trainerName?: string;
    sessionDate?: Date;
  };

  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  createdAt: Date;
}
