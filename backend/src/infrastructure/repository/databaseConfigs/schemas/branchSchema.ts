import mongoose, { Schema } from "mongoose";
import { BranchStatus } from "../../../../domain/enums/branchStatus";

export const branchSchema = new mongoose.Schema(
  {
    gymId: {
      type: Schema.Types.ObjectId,
      ref: "GymAdmin",
      required: true,
    },
    branchName: {
      type: String,
      required: true,
      trim: true,
    },
    phone:{
      type:String,
      required:true
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    openTime: {
      type: String,
      required: true,
    },
    closeTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(BranchStatus),
      default: BranchStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);
