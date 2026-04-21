import { PaymentStatus } from "../../../domain/enums/paymentStatus";
import { SalaryPaymentMethod } from "../../../domain/enums/salaryPaymentMethod";
import { StripeAccountStatus } from "../../../domain/enums/stripeAccountStatus";

export interface UpdateTrainerSalaryConfigDto {
  trainerId: string;
  paymentType: SalaryPaymentMethod;
  accountHolderName?: string;
  ifscCode?: string;
  upiId?: string;
}

export interface TrainerSalaryConfigResponseDto {
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
}

export interface CreateTrainerOnboardingLinkDto {
  trainerId: string;
  refreshUrl: string;
  returnUrl: string;
}

export interface CreateTrainerOnboardingLinkResponseDto {
  accountId: string;
  url: string;
}

export interface RefreshTrainerStripeStatusDto {
  trainerId: string;
}

export interface viewDetailSalaryResponseDto {
  id: string;

  salaryMonth: number;
  salaryYear: number;
  salaryMonthLabel: string;

  salaryBreakdown: {
    baseSalary: number;
    totalSessions: number;
    commissionRate: number;
    commissionAmount: number;
    bonus: number;
    leaveDeduction: number;
    otherDeduction: number;
    manualAdjustment: number;
  };

  grossSalary: number;
  totalDeduction: number;
  netSalary: number;

  paymentMethod: SalaryPaymentMethod;
  paymentStatus: PaymentStatus;
  currency: string;
  dueDate: Date | null;
  paidAt: Date | null;

  receiptUrl: string | null;

  exchangeRateUsed?: number;
  settledAmountInInr?: number;
  stripeChargeAmount?: number;
  stripeChargeCurrency?: string;

  createdAt: Date;
}

export interface ListSalaryResponseDto {
  id: string;
  salaryMonth: number;
  salaryYear: number;
  salaryMonthLabel: string;
  grossSalary: number;
  totalDeduction: number;
  netSalary: number;
  paymentMethod: SalaryPaymentMethod;
  paymentStatus: PaymentStatus;
  currency: "INR";
  paidAt?: Date;
  dueDate?: Date;
  createdAt?: Date;
}
