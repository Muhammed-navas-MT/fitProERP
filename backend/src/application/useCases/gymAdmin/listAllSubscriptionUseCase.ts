import { GymAdminRepository } from "../../../infrastructure/repository/gymAdmin/gymAdminRepo";
import { GymAdminAuthError } from "../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { NOtFoundException } from "../../constants/exceptions";
import { IListActiveSubscriptionResponseDTO } from "../../dtos/gymAdminDto/subscriptionDto";
import { ISubscripctionRespoditery } from "../../interfaces/repository/superAdmin/subscriptionRepoInterface";
import { IListAllActiveSubscriptionUseCase } from "../../interfaces/useCase/gymAdmin/listAllSubscriptionUseCaseInterface";
import { SubscriptionMapper } from "../../mappers/subscriptionMapper";

export class ListAllSubscription implements IListAllActiveSubscriptionUseCase {
    constructor(
        private _subscriptionRepository:ISubscripctionRespoditery,
        private _gymAdminRepository:GymAdminRepository
    ){};

    async listAllSubscription(gymId:string): Promise<IListActiveSubscriptionResponseDTO | null> {
        const gymAdmin = await this._gymAdminRepository.findById(gymId);
        if(!gymAdmin){
            throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
        };
        const subscriptions = await this._subscriptionRepository.listAllActiveSubscription();

        const response = SubscriptionMapper.toListAllActiveSubscriptionResponse(subscriptions,gymAdmin.packageId);
        return response;
    }
};