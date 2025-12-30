import { Document, model } from "mongoose";
import { branchSchema } from "../schemas/branchSchema";
import { BranchStatus } from "../../../../domain/enums/branchStatus";

export interface IBranchModel extends Document {
  _id: string;
  gymId: string;
  branchName: string;
  phone:string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  openTime: string;
  closeTime: string;
  status: BranchStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export const branchModel = model<IBranchModel>(
  "Branch",
  branchSchema
);
