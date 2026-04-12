import mongoose, { Schema } from "mongoose";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";
import { SalaryPaymentMethod } from "../../../../domain/enums/salaryPaymentMethod";

export const trainerSalarySchema = new mongoose.Schema(
  {
    gymId: {
      type: Schema.Types.ObjectId,
      ref: "GymAdmin",
      required: true,
    },
    branchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      default: null,
    },
    trainerId: {
      type: Schema.Types.ObjectId,
      ref: "Trainer",
      required: true,
    },

    salaryMonth: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    salaryYear: {
      type: Number,
      required: true,
    },
    salaryMonthLabel: {
      type: String,
      required: true,
      trim: true,
    },

    salaryBreakdown: {
      baseSalary: {
        type: Number,
        required: true,
        default: 0,
      },
      totalSessions: {
        type: Number,
        default: 0,
      },
      commissionRate: {
        type: Number,
        default: 0,
      },
      commissionAmount: {
        type: Number,
        default: 0,
      },
      bonus: {
        type: Number,
        default: 0,
      },
      leaveDeduction: {
        type: Number,
        default: 0,
      },
      otherDeduction: {
        type: Number,
        default: 0,
      },
      manualAdjustment: {
        type: Number,
        default: 0,
      },
    },

    grossSalary: {
      type: Number,
      required: true,
      default: 0,
    },
    totalDeduction: {
      type: Number,
      required: true,
      default: 0,
    },
    netSalary: {
      type: Number,
      required: true,
      default: 0,
    },

    paymentMethod: {
      type: String,
      enum: Object.values(SalaryPaymentMethod),
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      required: true,
      default: PaymentStatus.PENDING,
    },
    currency: {
      type: String,
      enum: ["INR"],
      default: "INR",
      required: true,
    },

    dueDate: {
      type: Date,
      default: null,
    },
    paidAt: {
      type: Date,
      default: null,
    },

    stripeCustomerId: {
      type: String,
      default: null,
      trim: true,
    },
    stripePaymentMethodId: {
      type: String,
      default: null,
      trim: true,
    },
    stripePaymentIntentId: {
      type: String,
      default: null,
      trim: true,
    },
    stripeTransferId: {
      type: String,
      default: null,
      trim: true,
    },
    stripePayoutId: {
      type: String,
      default: null,
      trim: true,
    },
    stripeConnectedAccountId: {
      type: String,
      default: null,
      trim: true,
    },

    receiptUrl: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);
