import { GymAdminEntity } from "../../../domain/entities/gymAdmin/gymAdminEntity";
import { SuperAdminPaymentEntity } from "../../../domain/entities/superAdmin/paymentEntity";
import { SubscriptionEntity } from "../../../domain/entities/superAdmin/subscriptionEntity";
import { IPopulatedPayment } from "../../../infrastructure/repository/databaseConfigs/types/populatedPaymentType";
import {
  IListPaymentRequestDTO,
  IListPaymentResponseDTO,
  IPaymentDetailDTO,
  IPaymentItemDTO,
} from "../../dtos/superAdminDto/paymentDto";

export class PaymentMapper {
  constructor() {}

  static toPaymentDetailDto(
    payment: SuperAdminPaymentEntity,
    gymAdmin: GymAdminEntity,
    subscription: SubscriptionEntity,
  ): IPaymentDetailDTO {
    return {
      id: payment.id?.toString() as string,
      gymName: gymAdmin.gymName,
      packageName: subscription.planName,
      stripeSessionId: payment.stripeSessionId,
      amount: payment.amount,
      currency: payment.currency,
      paymentMethod: payment.paymentMethod,
      status: payment.status,
      createdAt: payment.createdAt as Date,
      ownerName: gymAdmin.ownerName,
      ownerEmail: gymAdmin.email,
    };
  }

  static toPaymentListResponse(
  payments: IPopulatedPayment[],
  params: IListPaymentRequestDTO,
  total: number,
): IListPaymentResponseDTO {

  const page = params.page;
  const limit = params.limit;

  const mappedPayments: IPaymentItemDTO[] = payments.map((payment) => ({
    id: payment._id.toString(),
    gymName: payment.gym.gymName,
    packageName: payment.package.planName,
    amount: payment.amount,
    currency: payment.currency,
    paymentMethod: payment.paymentMethod,
    status: payment.status,
    createdAt: payment.createdAt,
  }));

  return {
    payments: mappedPayments,
    totalPayments: total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
}
}
