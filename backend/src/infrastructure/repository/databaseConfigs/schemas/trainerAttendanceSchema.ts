import { Schema } from "mongoose";

export const trainerAttendanceSchema = new Schema(
  {
     trainerId: {
      type: Schema.Types.ObjectId,
      ref: "Trainer",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["PRESENT", "ABSENT", "LEAVE"],
      required: true,
    },

    checkInTime: {
      type: Date,
    },

    checkOutTime: {
      type: Date,
    },
  }
);

trainerAttendanceSchema.index({ trainerId: 1, date: 1 }, { unique: true });
