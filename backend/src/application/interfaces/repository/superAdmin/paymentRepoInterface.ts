import { SuperAdminPaymentEntity } from "../../../../domain/entities/superAdmin/paymentEntity";
import { IPopulatedPayment } from "../../../../infrastructure/repository/databaseConfigs/types/populatedPaymentType";
import { IListPaymentRequestDTO } from "../../../dtos/superAdminDto/paymentDto";
import { IBaseRepository } from "../base/baseRepo";

export interface ISuperAdminPaymentRepository extends IBaseRepository<SuperAdminPaymentEntity>{
    existsBySessionId(sessionId: string): Promise<boolean>;
    findAllPayments(params:IListPaymentRequestDTO):Promise<{payments:IPopulatedPayment[],total:number}>
}