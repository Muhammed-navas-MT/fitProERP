import { Types } from "mongoose";
import { PaymentMethod } from "../../../../domain/enums/paymentMethod";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";

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
