import mongoose, { Schema } from "mongoose";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";
import { PaymentMethod } from "../../../../domain/enums/paymentMethod";
import { ExpenseType } from "../../../../domain/enums/expenseType";
import { ExpencseCreateModel } from "../../../../domain/enums/expenseCreateModel";

export const ExpenseSchema = new mongoose.Schema(
  {
    gymId: {
      type: Schema.Types.ObjectId,
      ref: "GymAdmin",
      required: true,
    },

    branchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },

    expenseType: {
      type: String,
      enum: Object.values(ExpenseType),
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "createdByModel",
    },

    createdByModel: {
      type: String,
      required: true,
      enum: Object.values(ExpencseCreateModel),
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

    paymentDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  },
);
