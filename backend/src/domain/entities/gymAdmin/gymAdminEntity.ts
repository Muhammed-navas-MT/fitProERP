import { PaymentStatus } from "../../enums/paymentStatus";
import { Roles } from "../../enums/roles";
import { Status } from "../../enums/status";
import { PaymentMethodType } from "../../enums/stripePaymentMethodType";

export interface GymAdminEntity {
  _id?: string;
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
    maxMembers: number;
    maxTrainers: number;
    maxBranches: number;
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
