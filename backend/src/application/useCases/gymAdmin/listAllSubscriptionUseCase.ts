import { IListActiveSubscriptionResponseDTO } from "../../dtos/gymAdminDto/subscriptionDto";
import { ISubscripctionRespoditery } from "../../interfaces/repository/superAdmin/subscriptionRepoInterface";
import { IListAllActiveSubscriptionUseCase } from "../../interfaces/useCase/gymAdmin/listAllSubscriptionUseCaseInterface";
import { SubscriptionMapper } from "../../mappers/subscriptionMapper";

export class ListAllSubscription implements IListAllActiveSubscriptionUseCase {
    constructor(private _subscriptionRepository:ISubscripctionRespoditery){};

    async listAllSubscription(): Promise<IListActiveSubscriptionResponseDTO | null> {
        let subscriptions = await this._subscriptionRepository.listAllActiveSubscription();
        const response = SubscriptionMapper.toListAllActiveSubscriptionResponse(subscriptions);
        return response;
    }
};