import mongoose, { Schema } from "mongoose";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";
import { PaymentMethod } from "../../../../domain/enums/paymentMethod";

export const PaymentSchema = new mongoose.Schema(
  {
    gymId: {
      type: Schema.Types.ObjectId,
      ref: "GymAdmin",
      required: true,
    },
    packageId: {
      type: Schema.Types.ObjectId,
      ref: "Subscription",
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
      type:String
     },
      currency:{
        type:String
      },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);