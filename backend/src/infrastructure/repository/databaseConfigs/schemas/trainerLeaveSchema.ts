import mongoose, { Schema } from "mongoose";
import { LeaveStatus } from "../../../../domain/enums/leaveStatus";

export const trainerLeaveSchema = new mongoose.Schema(
  {
    gymId: {
      type: Schema.Types.ObjectId,
      ref: "GymAdmin",
      required: true,
    },
    trainerId: {
      type: Schema.Types.ObjectId,
      ref: "Trainer",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(LeaveStatus),
      default: LeaveStatus.PENDING,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    rejectionReason: {
      type: String,
      trim: true,
    },
    appliedDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "GymAdmin",
    },
  },
  {
    timestamps: true,
  },
);
