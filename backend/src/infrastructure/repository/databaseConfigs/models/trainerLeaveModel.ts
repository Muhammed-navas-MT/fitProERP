import { Document, model } from "mongoose";
import { trainerLeaveSchema } from "../schemas/trainerLeaveSchema";
import { LeaveStatus } from "../../../../domain/enums/leaveStatus";

export interface ITrainerLeaveModel extends Document {
  _id: string;
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

export const trainerLeaveModel = model<ITrainerLeaveModel>(
  "TrainerLeave",
  trainerLeaveSchema,
);
