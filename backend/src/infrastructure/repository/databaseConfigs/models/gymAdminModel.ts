import { gymAdminSchema } from "../schemas/gymAdminSchema";
import { Status } from "../../../../domain/enums/status";
import { Document, model } from "mongoose";
import { Roles } from "../../../../domain/enums/roles";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";
import { PaymentMethodType } from "../../../../domain/enums/stripePaymentMethodType";

export interface IGymAdminModel extends Document {
  _id: string;
  gymName: string;
  ownerName: string;
  email: string;
  phone: string;
  password: string;
  role: Roles;
  subdomain: string;
  description: string;
  tagline: string;
  businessLicense: string;
  insuranceCertificate: string;
  packageId?: string;
  paymentStatus?: PaymentStatus;
  subscriptionStart?: Date;
  subscriptionEnd?: Date;
  limits?: {
    maxBranches: number;
    maxTrainers: number;
    maxMembers: number;
  };
  logo: string;
  status?: Status;
  branches?: string[];
  billingConfig?: {
    stripeCustomerId?: string;
    defaultPaymentMethodId?: string;
    paymentMethodType?: PaymentMethodType;
    paymentMethodBrand?: string;
    paymentMethodLast4?: string;
    billingEmail?: string;
    isDefaultPaymentMethodAdded?: boolean;
  };
  createdAt?: Date;
}

export const gymAdminModel = model<IGymAdminModel>("GymAdmin", gymAdminSchema);
