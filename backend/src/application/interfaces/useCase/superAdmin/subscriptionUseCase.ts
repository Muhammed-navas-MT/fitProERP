import { SubscriptionEntity } from "../../../../domain/entities/superAdmin/subscriptionEntity";
import { IListSubscriptionRequestDTO, IListSubscriptionResponseDTO,ISubscriptionResponseDTO} from "../../../dtos/superAdminDto/subscriptionDto";

export interface ISubscriptionUseCase {
    createSubscription(subscription:SubscriptionEntity):Promise<void>;
    blockSubscription(id:string):Promise<void>;
    unBlockSubscription(id:string):Promise<void>;
    findSubscripition(id:string):Promise<ISubscriptionResponseDTO|null>;
    updateSubscription(subscription:SubscriptionEntity,id:string):Promise<void>;
    listSubscriptions(params:IListSubscriptionRequestDTO):Promise<IListSubscriptionResponseDTO|null>
}