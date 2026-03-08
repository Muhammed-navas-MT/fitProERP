import {
  IListPaymentsRequestDto,
  IListPaymentResponseDTO,
} from "../../../dtos/memberDto/purchasePackageDto";
import { IGymAdminRevenueRepository } from "../../../interfaces/repository/gymAdmin/revenueRepoInterface";
import { IListPaymentUseCase } from "../../../interfaces/useCase/member/packageAndPurchaseManagement/listAllPaymentsUseCaseInterface";
import { mapPaymentsResponse } from "../../../mappers/member/paymentMapper";

export class ListAllPaymentsUseCase implements IListPaymentUseCase {
  constructor(private _revenueRepository: IGymAdminRevenueRepository) {}

  async execute(
    params: IListPaymentsRequestDto,
  ): Promise<IListPaymentResponseDTO> {
    const { payments, summary, grandTotalAmount, total } =
      await this._revenueRepository.findAllPaymentsByMemberId(params);

    return mapPaymentsResponse(
      payments,
      params,
      total,
      summary,
      grandTotalAmount,
    );
  }
}
