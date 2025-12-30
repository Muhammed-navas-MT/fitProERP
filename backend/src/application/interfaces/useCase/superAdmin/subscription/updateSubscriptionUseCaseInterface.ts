import { SubscriptionEntity } from "../../../../../domain/entities/superAdmin/subscriptionEntity";

export interface IUpdateSubscriptionUseCase {
    updateSubscription(subscription:SubscriptionEntity,id:string):Promise<void>;
}