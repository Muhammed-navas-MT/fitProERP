import { SubscriptionError } from "../../../../presentation/shared/constants/errorMessage/subscriptionError";
import { NOtFoundException } from "../../../constants/exceptions";
import { ISubscriptionResponseDTO } from "../../../dtos/superAdminDto/subscriptionDto";
import { ISubscripctionRespoditery } from "../../../interfaces/repository/superAdmin/subscriptionRepoInterface";
import { IFindSubscriptionUseCase } from "../../../interfaces/useCase/superAdmin/subscription/findSubscripitionUseCaseInterface";
import { SubscriptionMapper } from "../../../mappers/subscriptionMapper";

export class FindSubscripitionUseCase implements IFindSubscriptionUseCase {
    constructor(private _subscriptionRepository:ISubscripctionRespoditery){};

    async findSubscripition(id: string): Promise<ISubscriptionResponseDTO | null> {
        const subscription = await this._subscriptionRepository.findById(id);

        if(!subscription){
            throw new NOtFoundException(SubscriptionError.SUBSCRIPTION_NOT_FOUND)
        }
        const response:ISubscriptionResponseDTO = SubscriptionMapper.toSubscripitionResponse(subscription);
        return response;
    };
};