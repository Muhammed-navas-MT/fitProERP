import { SubscriptionEntity } from "../../../../../domain/entities/superAdmin/subscriptionEntity"

export interface ICreateSubscriptionUseCase {
    createSubscription(subscription:SubscriptionEntity):Promise<void>;
}