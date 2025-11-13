import { IBaseRepository } from "../base/baseRepo";
import { SubscriptionEntity } from "../../../../domain/entities/superAdmin/subscriptionEntity";
import { ISubscriptionResponseDTO } from "../../../dtos/superAdminDto/subscriptionDto";
import { IListSubscriptionRequestDTO } from "../../../dtos/superAdminDto/subscriptionDto";

export interface ISubscripctionRespoditery extends IBaseRepository<SubscriptionEntity>{
    findByPlanName(planName:string):Promise<boolean>;
    listAllSubscriptions(params:IListSubscriptionRequestDTO):Promise<{subscription:SubscriptionEntity[],total:number}>
}