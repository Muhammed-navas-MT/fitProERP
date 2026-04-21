import { Schema } from "mongoose";
import { Status } from "../../../../domain/enums/status";
import { Roles } from "../../../../domain/enums/roles";
import { StripeAccountStatus } from "../../../../domain/enums/stripeAccountStatus";
import { SalaryPaymentMethod } from "../../../../domain/enums/salaryPaymentMethod";

export const trainerSchema = new Schema(
  {
    gymId: {
      type: Schema.Types.ObjectId,
      ref: "GymAdmin",
      required: true,
      index: true,
    },
    branchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(Roles),
      required: true,
    },
    specialization: {
      type: [String],
      required: true,
      default: [],
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    baseSalary: {
      type: Number,
      min: 0,
    },
    commisionRate: {
      type: Number,
      min: 0,
    },
    sessionCount: {
      type: Number,
      required: true,
    },
    allocatedLeaveCount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.IN_ACTIVE,
    },
    dutyTime: {
      startTime: {
        type: String,
      },
      endTime: {
        type: String,
      },
    },
    salaryConfig: {
      paymentType: {
        type: String,
        enum: Object.values(SalaryPaymentMethod),
      },

      isPayoutEnabled: {
        type: Boolean,
        default: false,
      },

      stripeConnectedAccountId: {
        type: String,
      },

      stripeAccountStatus: {
        type: String,
        enum: Object.values(StripeAccountStatus),
      },

      stripeOnboardingCompleted: {
        type: Boolean,
        default: false,
      },

      accountHolderName: {
        type: String,
        trim: true,
      },

      bankName: {
        type: String,
        trim: true,
      },

      bankLast4: {
        type: String,
      },

      ifscCode: {
        type: String,
        uppercase: true,
        trim: true,
      },

      upiId: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  },
);
