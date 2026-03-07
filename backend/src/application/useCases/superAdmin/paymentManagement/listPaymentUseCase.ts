import { IListPaymentRequestDTO, IListPaymentResponseDTO } from "../../../dtos/superAdminDto/paymentDto";
import { ISuperAdminPaymentRepository } from "../../../interfaces/repository/superAdmin/paymentRepoInterface";
import { IListPaymentsUseCase } from "../../../interfaces/useCase/superAdmin/paymentManagement/listPaymentsUseCaseInterface";
import { PaymentMapper } from "../../../mappers/superAdmin/paymentMapper";

export class ListPaymentUseCase implements IListPaymentsUseCase {
    constructor(
        private _paymentRepository:ISuperAdminPaymentRepository,
    ){}
    async listPayments(params: IListPaymentRequestDTO): Promise<IListPaymentResponseDTO | null> {
        const {payments,total} = await this._paymentRepository.findAllPayments(params);
       const response = PaymentMapper.toPaymentListResponse(payments,params,total);
       return response
    }
}