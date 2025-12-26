import { SubscriptionError } from "../../../../presentation/shared/constants/errorMessage/subscriptionError";
import { UpdateFailedException } from "../../../constants/exceptions";
import { ISubscripctionRespoditery } from "../../../interfaces/repository/superAdmin/subscriptionRepoInterface";
import { IUnBlockSubscriptionUseCase } from "../../../interfaces/useCase/superAdmin/subscription/unBlockSubscriptionUseCaseInterface";

export class UnBlockSubscriptionUseCase implements IUnBlockSubscriptionUseCase {
    constructor(private _subscriptionRepository:ISubscripctionRespoditery){};

    async unBlockSubscription(id: string): Promise<void> {
        const result = await this._subscriptionRepository.unBlockById(id);
        if(!result){
        throw new UpdateFailedException(SubscriptionError.SUBSCRIPTION_UPDATE_FAILED)
       }
    }
};