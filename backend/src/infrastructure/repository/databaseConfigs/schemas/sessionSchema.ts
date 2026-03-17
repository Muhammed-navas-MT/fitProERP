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
    sessionDate: {
      type: Date,
      required: true,
    },
    duration: {
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
    timestamps: { createdAt: true, updatedAt: false },
  },
);
