import mongoose, { Schema } from "mongoose";
import { SessionStatus } from "../../../../domain/enums/sessionStatus";

export const SessionSchema = new mongoose.Schema(
  {
    memberId: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    trainerId: {
      type: Schema.Types.ObjectId,
      ref: "Trainer",
      required: true,
    },
    slotId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    feedback: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(SessionStatus),
      default: SessionStatus.PENDING,
    },
  },
  {
    timestamps: true,
  },
);
