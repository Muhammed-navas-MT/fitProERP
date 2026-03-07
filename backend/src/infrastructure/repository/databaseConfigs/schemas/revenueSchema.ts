import mongoose, { Schema } from "mongoose";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";
import { PaymentMethod } from "../../../../domain/enums/paymentMethod";
import { RevenueSourceType } from "../../../../domain/enums/gymRevenueSourceType";

export const RevenueSchema = new mongoose.Schema(
  {
    gymId: {
      type: Schema.Types.ObjectId,
      ref: "GymAdmin",
      required: true,
    },
    branchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Member",
    },
    sourceType: {
      type: String,
      enum: Object.values(RevenueSourceType),
      required: true,
    },
    sourceId: {
      type: Schema.Types.ObjectId,
      refPath: "sourceType",
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      required: true,
      trim: true,
    },
    stripeSessionId: {
      type: String,
    },
    currency: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);
