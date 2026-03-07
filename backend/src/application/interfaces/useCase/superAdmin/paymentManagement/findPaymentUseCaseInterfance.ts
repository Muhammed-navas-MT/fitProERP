import { IPaymentDetailDTO } from "../../../../dtos/superAdminDto/paymentDto";

export interface IFindPaymentUseCase {
    execute(id:string):Promise<IPaymentDetailDTO>;
}