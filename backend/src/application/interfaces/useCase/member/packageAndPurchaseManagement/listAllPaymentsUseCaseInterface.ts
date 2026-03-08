import {
  IListPaymentResponseDTO,
  IListPaymentsRequestDto,
} from "../../../../dtos/memberDto/purchasePackageDto";

export interface IListPaymentUseCase {
  execute(params: IListPaymentsRequestDto): Promise<IListPaymentResponseDTO>;
}
