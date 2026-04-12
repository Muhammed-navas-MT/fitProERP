import mongoose from "mongoose";
import { Status } from "../../../../domain/enums/status";
import { Roles } from "../../../../domain/enums/roles";
import { Schema } from "mongoose";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";
import { PaymentMethodType } from "../../../../domain/enums/stripePaymentMethodType";

export const gymAdminSchema = new mongoose.Schema(
  {
    gymName: { type: String, required: true },
    ownerName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Roles), required: true },
    subdomain: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    tagline: { type: String, required: true },
    businessLicense: { type: String, required: true },
    insuranceCertificate: { type: String, required: true },
    packageId: { type: Schema.Types.ObjectId, ref: "Subscription" },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    subscriptionStart: { type: Date },
    subscriptionEnd: { type: Date },
    limits: {
      maxBranches: { type: Number },
      maxTrainers: { type: Number },
      maxMembers: { type: Number },
    },
    logo: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.PENDING,
    },
    branches: [{ type: Schema.Types.ObjectId, ref: "Branch" }],
    billingConfig: {
      stripeCustomerId: {
        type: String,
        default: null,
        trim: true,
      },
      defaultPaymentMethodId: {
        type: String,
        default: null,
        trim: true,
      },
      paymentMethodType: {
        type: String,
        enum: Object.values(PaymentMethodType),
        default: null,
      },
      paymentMethodBrand: {
        type: String,
        default: null,
        trim: true,
      },
      paymentMethodLast4: {
        type: String,
        default: null,
        trim: true,
      },
      billingEmail: {
        type: String,
        default: null,
        trim: true,
        lowercase: true,
      },
      isDefaultPaymentMethodAdded: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true },
);
