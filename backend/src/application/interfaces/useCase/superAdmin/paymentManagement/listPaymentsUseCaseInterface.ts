import { IListPaymentRequestDTO, IListPaymentResponseDTO } from "../../../../dtos/superAdminDto/paymentDto";

export interface IListPaymentsUseCase {
    listPayments(params:IListPaymentRequestDTO):Promise<IListPaymentResponseDTO|null>
}