import { RevenueSourceType } from "../../../domain/enums/gymRevenueSourceType";
import {
  IPopulatedPayment,
  SummaryType,
} from "../../../infrastructure/repository/databaseConfigs/types/populatedRevenueType";
import {
  IListPaymentsRequestDto,
  IListPaymentResponseDTO,
  PaymentResponseDto,
} from "../../dtos/memberDto/purchasePackageDto";

export function mapPaymentsResponse(
  payments: IPopulatedPayment[],
  params: IListPaymentsRequestDto,
  total: number,
  summary: SummaryType[],
  grandTotalAmount: number,
): IListPaymentResponseDTO {
  const mappedPayments: PaymentResponseDto[] = payments.map((payment) => ({
    id: payment._id,
    source: payment.source,
    sourceType: payment.sourceType,
    sourceDetails: {
      planName: payment.sourceDetails?.planName,
      duration: payment.sourceDetails?.duration,
      trainerName: payment.sourceDetails?.trainerName,
      sessionDate: payment.sourceDetails?.sessionDate,
    },
    amount: payment.amount,
    paymentMethod: payment.paymentMethod,
    status: payment.status,
    createdAt: payment.createdAt,
  }));

  const defaultSummary: SummaryType[] = [
    {
      sourceType: RevenueSourceType.PLAN,
      totalAmount: 0,
      count: 0,
    },
    {
      sourceType: RevenueSourceType.BOOK,
      totalAmount: 0,
      count: 0,
    },
  ];

  const summaryMap = new Map<string, SummaryType>();

  summary.forEach((item) => {
    summaryMap.set(item.sourceType, item);
  });

  const finalSummary = defaultSummary.map((defaultItem) => {
    return summaryMap.get(defaultItem.sourceType) || defaultItem;
  });

  return {
    revenues: mappedPayments,
    page: params.page,
    total,
    totalPages: Math.ceil(total / params.limit),
    search: params.search,
    limit: params.limit,
    sourceType: params.sourceType,
    summary: finalSummary,
    grandTotalAmount,
  };
}
