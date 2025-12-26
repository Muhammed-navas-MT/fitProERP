import { IListSubscriptionRequestDTO, IListSubscriptionResponseDTO } from "../../../dtos/superAdminDto/subscriptionDto";
import { ISubscripctionRespoditery } from "../../../interfaces/repository/superAdmin/subscriptionRepoInterface";
import { IListSubscriptionUseCase } from "../../../interfaces/useCase/superAdmin/subscription/listSubscriptionsUseCaseInterface";
import { SubscriptionMapper } from "../../../mappers/subscriptionMapper";

export class ListSubscriptionsUseCase implements IListSubscriptionUseCase {
    constructor(private _subscriptionRepository:ISubscripctionRespoditery){};

    async listSubscriptions(params: IListSubscriptionRequestDTO): Promise<IListSubscriptionResponseDTO | null> {

        let {subscription,total} = await this._subscriptionRepository.listAllSubscriptions(params);

        const response:IListSubscriptionResponseDTO = SubscriptionMapper.toListSubscriptionResponse(subscription,total,params);
        return response
    }

};