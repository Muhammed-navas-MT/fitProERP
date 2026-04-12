import { Roles } from "../../enums/roles";
import { SalaryPaymentMethod } from "../../enums/salaryPaymentMethod";
import { Status } from "../../enums/status";
import { StripeAccountStatus } from "../../enums/stripeAccountStatus";

export interface TrainerEntity {
  _id?: string;
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
