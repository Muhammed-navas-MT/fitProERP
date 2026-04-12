import { Document, model, Model } from "mongoose";
import { trainerSchema } from "../schemas/trainerSchema";
import { Status } from "../../../../domain/enums/status";
import { Roles } from "../../../../domain/enums/roles";
import { SalaryPaymentMethod } from "../../../../domain/enums/salaryPaymentMethod";
import { StripeAccountStatus } from "../../../../domain/enums/stripeAccountStatus";

export interface ITrainerModel extends Document {
  _id: string;
  gymId: string;
  branchId?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  role: Roles;
  specialization: string[];
  experience: number;
  baseSalary: number;
  commisionRate: number;
  sessionCount: number;
  allocatedLeaveCount: number;
  status: Status;
  dutyTime: {
    startTime: string;
    endTime: string;
  };
  salaryConfig?: {
    paymentType: SalaryPaymentMethod;
    isPayoutEnabled: boolean;
    stripeConnectedAccountId?: string;
    stripeAccountStatus?: StripeAccountStatus;
    stripeOnboardingCompleted?: boolean;
    accountHolderName?: string;
    bankName?: string;
    bankLast4?: string;
    ifscCode?: string;
    upiId?: string;
  };
  createdAt?: Date;
}

export const trainerModel: Model<ITrainerModel> = model<ITrainerModel>(
  "Trainer",
  trainerSchema,
);
