import { SubscriptionError } from "../../../../presentation/shared/constants/errorMessage/subscriptionError";
import { AlreadyExistException } from "../../../constants/exceptions";
import { ISubscriptionRequestDTO } from "../../../dtos/superAdminDto/subscriptionDto";
import { ISubscripctionRespoditery } from "../../../interfaces/repository/superAdmin/subscriptionRepoInterface";
import { ICreateSubscriptionUseCase } from "../../../interfaces/useCase/superAdmin/subscription/createSubscriptionUseCaseInterface";

export class CreateSubscriptionUseCase implements ICreateSubscriptionUseCase {
    constructor(private _subscriptionRepository:ISubscripctionRespoditery){};

    async createSubscription(subscription: ISubscriptionRequestDTO): Promise<void> {
        const findSubscription = await this._subscriptionRepository.findByPlanName(subscription.planName);

        if(findSubscription){
            throw new AlreadyExistException (SubscriptionError.SUBSCRIPTION_AlREADY_EXIST);
        };
        const id = await this._subscriptionRepository.create(subscription);
        return;
    }
};