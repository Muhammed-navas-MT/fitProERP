import { RevenueSourceType } from "../../../domain/enums/gymRevenueSourceType";
import { PaymentMethod } from "../../../domain/enums/paymentMethod";
import { PaymentStatus } from "../../../domain/enums/paymentStatus";
import { SummaryType } from "../../../infrastructure/repository/databaseConfigs/types/populatedRevenueType";

export interface CreateMemberCheckoutSessionRequestDto {
  planId: string;
  userId: string;
  subdomain: string;
}

export interface IListPaymentsRequestDto {
  memberId: string;
  search: string;
  limit: number;
  page: number;
  sourceType: string;
}

export interface PaymentResponseDto {
  id: string;
  source: string;
  sourceType: RevenueSourceType;
  sourceDetails: {
    planName?: string;
    duration?: string;
    trainerName?: string;
    sessionDate?: Date;
  };

  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  createdAt: Date;
}

export interface IListPaymentResponseDTO {
  revenues: PaymentResponseDto[];
  page: number;
  total: number;
  totalPages: number;
  search: string;
  limit: number;
  sourceType: string;
  summary: SummaryType[];
  grandTotalAmount: number;
}
