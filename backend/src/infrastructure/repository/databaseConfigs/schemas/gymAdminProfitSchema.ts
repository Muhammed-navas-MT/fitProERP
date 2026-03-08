import mongoose, { Schema } from "mongoose";

export const ProfitSchema = new mongoose.Schema(
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

    totalRevenue: {
      type: Number,
      required: true,
      default: 0,
    },

    totalExpense: {
      type: Number,
      required: true,
      default: 0,
    },

    netProfit: {
      type: Number,
      required: true,
      default: 0,
    },

    revenueCount: {
      type: Number,
      required: true,
      default: 0,
    },

    expenseCount: {
      type: Number,
      required: true,
      default: 0,
    },

    periodStart: {
      type: Date,
      required: true,
    },

    periodEnd: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);
