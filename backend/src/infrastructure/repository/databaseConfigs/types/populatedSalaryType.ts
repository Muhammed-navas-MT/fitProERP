import { PaymentStatus } from "../../../../domain/enums/paymentStatus";
import { SalaryPaymentMethod } from "../../../../domain/enums/salaryPaymentMethod";

export interface IPopulatedSalaryBranch {
  branchName: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
}

export interface IPopulatedSalaryTrainer {
  name: string;
  email: string;
}

export interface IPopulatedSalary {
  _id: string;
  gymId: string;
  branchId: IPopulatedSalaryBranch;
  trainerId: IPopulatedSalaryTrainer;

  salaryMonth: number;
  salaryYear: number;
  salaryMonthLabel: string;

  salaryBreakdown: {
    baseSalary: number;
    totalSessions?: number;
    commissionRate?: number;
    commissionAmount?: number;
    bonus?: number;
    leaveDeduction?: number;
    otherDeduction?: number;
    manualAdjustment?: number;
  };

  grossSalary: number;
  totalDeduction: number;
  netSalary: number;

  paymentMethod: SalaryPaymentMethod;
  paymentStatus: PaymentStatus;
  currency: string;

  paidAt?: Date | null;
  dueDate?: Date | null;

  stripeCustomerId: string | null;
  stripePaymentIntentId: string | null;
  stripePaymentMethodId: string | null;
  stripeTransferId: string | null;
  stripePayoutId: string | null;
  stripeConnectedAccountId: string | null;
  receiptUrl: string | null;

  exchangeRateUsed?: number;
  settledAmountInInr?: number;
  stripeChargeAmount?: number;
  stripeChargeCurrency?: string;

  createdAt: Date;
}
