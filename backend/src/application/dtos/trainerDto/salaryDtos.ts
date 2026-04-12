import { PaymentStatus } from "../../../domain/enums/paymentStatus";
import { SalaryPaymentMethod } from "../../../domain/enums/salaryPaymentMethod";
import { PaymentMethodType } from "../../../domain/enums/stripePaymentMethodType";

export interface CreateTrainerSalaryDto {
  gymId: string;
}

export interface PayTrainerSalaryDto {
  salaryId: string;
  gymId: string;
}

export interface TrainerSalaryResponseDto {
  id: string;
  trainerId: string;
  trainerName: string;
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

export interface ListTrainerSalaryResponseDto {
  total: number;
  totalPages: number;
  limit: number;
  page: number;
  isGenerated: boolean;
  isBillingConfigAdded: boolean;
  isDefaultPaymentMethodAdded?: boolean;
  salaries: TrainerSalaryResponseDto[];
}

export interface ListTrainerSalaryRequestDto {
  gymId: string;
  limit: number;
  page: number;
  paymentStatus?: PaymentStatus;
}

export interface SaveBillingEmailDto {
  gymId: string;
  billingEmail: string;
}

export interface SaveBillingEmailResponseDto {
  billingEmail: string;
  isDefaultPaymentMethodAdded: boolean;
}

export interface GetBillingConfigDto {
  gymId: string;
}

export interface BillingConfigResponseDto {
  billingEmail?: string;
  paymentMethodType?: PaymentMethodType;
  paymentMethodBrand?: string;
  paymentMethodLast4?: string;
  isDefaultPaymentMethodAdded: boolean;
}

export interface CreateSetupIntentDto {
  gymId: string;
}

export interface CreateSetupIntentResponseDto {
  clientSecret: string;
}

export interface SavePaymentMethodDto {
  gymId: string;
  paymentMethodId: string;
  billingEmail?: string;
}

export interface SavePaymentMethodResponseDto {
  billingEmail?: string;
  paymentMethodType?: PaymentMethodType;
  paymentMethodBrand?: string;
  paymentMethodLast4?: string;
  isDefaultPaymentMethodAdded: boolean;
}
