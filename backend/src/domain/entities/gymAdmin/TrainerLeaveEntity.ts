import { LeaveStatus } from "../../enums/leaveStatus";

export interface ITrainerLeaveEntity {
  _id?: string;
  gymId: string;
  trainerId: string;
  startDate: Date;
  endDate: Date;
  status: LeaveStatus;
  reason: string;
  rejectionReason?: string;
  appliedDate: Date;
  approvedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
