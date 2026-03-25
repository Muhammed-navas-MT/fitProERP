import { LeaveStatus } from "../../../../domain/enums/leaveStatus";

export interface IPopulatedTrainer {
  _id: string;
  branchId: string;
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

export interface PopulateTrainerLeave {
  _id: string;
  startDate: Date;
  endDate: Date;
  leaveCount: number;
  status: LeaveStatus;
  reason: string;
  rejectionReason?: string;
  appliedDate: Date;
  branchDetail: IPopulatedBranch;
  trainerDetail: IPopulatedTrainer;
}

export interface PopulateListTrainerLeaves {
  _id: string;
  startDate: Date;
  endDate: Date;
  leaveCount: number;
  status: LeaveStatus;
  reason: string;
  appliedDate: Date;
  branchDetail: IPopulatedBranch;
  trainerDetail: IPopulatedTrainer;
}
