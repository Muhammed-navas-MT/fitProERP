import { SubscriptionEntity } from "../../domain/entities/superAdmin/subscriptionEntity";
import { Durations } from "../../domain/enums/duration";
import { IListSubscriptionRequestDTO, IListSubscriptionResponseDTO, ISubscriptionResponseDTO } from "../dtos/superAdminDto/subscriptionDto";

export class SubscriptionMapper {
    static toSubscripitionResponse(subscription:SubscriptionEntity):ISubscriptionResponseDTO{
        return {
            id:subscription._id?.toString()||"",
            planName:subscription.planName||"",
            price:subscription.price||0,
            duration:subscription.duration,
            features:subscription.features,
            isActive:subscription.isActive
        }
    }

    static toListSubscriptionResponse(subscriptions:SubscriptionEntity[],total:number,params:IListSubscriptionRequestDTO):IListSubscriptionResponseDTO{
        return{
            total:total,
            page:params.page,
            limit:params.limit,
            totalPages:Math.ceil(total/params.limit),
            search:params.search,
            data:subscriptions?.map(subscription =>({
                id:subscription._id?.toString(),
                planName:subscription.planName,
                price:subscription.price,
                duration:subscription.duration,
                features:subscription.features,
                isActive:subscription.isActive
            })) ?? []

        }
    }
}