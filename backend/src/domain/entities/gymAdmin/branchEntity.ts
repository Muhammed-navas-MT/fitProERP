import { BranchStatus } from "../../enums/branchStatus";

export interface IBranchEntity {
  _id?: string;
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
  status:BranchStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
