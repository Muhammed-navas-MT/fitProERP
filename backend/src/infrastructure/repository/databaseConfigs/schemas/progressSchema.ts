import mongoose, { Schema } from "mongoose";
import { BMIStatus } from "../../../../domain/enums/BMIStatus";

export const ProgressSchema = new mongoose.Schema({
  memberId: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  weight: {
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      enum: ["kg", "lbs"],
      default: "kg",
    },
  },
  bmi: {
    type: Number,
    required: true,
  },
  bmiCategory: {
    type: String,
    enum: Object.values(BMIStatus),
    required: true,
  },
  bodyFatPercentage: {
    type: Number,
  },
  muscleMass: {
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      enum: ["kg", "lbs"],
      default: "kg",
    },
  },
  note: {
    type: String,
  },
  progressDate: {
    type: Date,
    required: true,
  },
  timestamps: { createdAt: true, updatedAt: false },
});
