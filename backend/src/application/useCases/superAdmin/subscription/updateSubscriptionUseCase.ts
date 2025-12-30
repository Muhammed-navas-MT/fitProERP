import { SubscriptionError } from "../../../../presentation/shared/constants/errorMessage/subscriptionError";
import { UpdateFailedException } from "../../../constants/exceptions";
import { ISubscriptionRequestDTO } from "../../../dtos/superAdminDto/subscriptionDto";
import { ISubscripctionRespoditery } from "../../../interfaces/repository/superAdmin/subscriptionRepoInterface";
import { IUpdateSubscriptionUseCase } from "../../../interfaces/useCase/superAdmin/subscription/updateSubscriptionUseCaseInterface";

export class UpdateSubscriptionUseCase implements IUpdateSubscriptionUseCase {
    constructor(private _subscriptionRepository:ISubscripctionRespoditery){};

    async updateSubscription(subscription: ISubscriptionRequestDTO, id: string): Promise<void> {
        const existingSubscription = await this._subscriptionRepository.findByPlanName(subscription.planName);

        if (existingSubscription && existingSubscription._id?.toString() !== id) {
            throw new UpdateFailedException(SubscriptionError.SUBSCRIPTION_AlREADY_EXIST);
        }
        const result = await this._subscriptionRepository.update(subscription,id);
    
        if(!result){
            throw new UpdateFailedException(SubscriptionError.SUBSCRIPTION_UPDATE_FAILED);
        };
    }
};