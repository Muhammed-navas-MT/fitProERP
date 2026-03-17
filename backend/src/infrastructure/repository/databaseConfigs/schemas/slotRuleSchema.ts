import mongoose, { Schema } from "mongoose";

export const SlotRuleSchema = new mongoose.Schema(
  {
    trainerId: {
      type: Schema.Types.ObjectId,
      ref: "Trainer",
      required: true,
    },
    rrule: {
      type: String,
      required: true,
    },
    slots: [
      {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);
