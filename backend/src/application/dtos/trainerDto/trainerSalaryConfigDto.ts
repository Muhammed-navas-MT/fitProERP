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
