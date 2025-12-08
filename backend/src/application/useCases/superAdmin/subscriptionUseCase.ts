import { IListSubscriptionRequestDTO, IListSubscriptionResponseDTO, ISubscriptionRequestDTO } from "../../dtos/superAdminDto/subscriptionDto";
import { ISubscripctionRespoditery } from "../../interfaces/repository/superAdmin/subscriptionRepoInterface";
import { ISubscriptionUseCase } from "../../interfaces/useCase/superAdmin/subscriptionUseCase";
import { SubscriptionError } from "../../../presentation/shared/constants/errorMessage/subscriptionError";
import { SubscriptionMapper } from "../../mappers/subscriptionMapper";
import { ISubscriptionResponseDTO } from "../../dtos/superAdminDto/subscriptionDto";
import { AlreadyExistException, NOtFoundException, UpdateFailedException } from "../../constants/exceptions";

export class SubscriptionUseCase implements ISubscriptionUseCase {
    constructor(private _subscriptionRepository:ISubscripctionRespoditery){};

    async createSubscription(subscription: ISubscriptionRequestDTO): Promise<void> {
        const findSubscription = await this._subscriptionRepository.findByPlanName(subscription.planName);

        if(findSubscription){
            throw new AlreadyExistException (SubscriptionError.SUBSCRIPTION_AlREADY_EXIST);
        };
        const id = await this._subscriptionRepository.create(subscription);
        return;
    }

    async blockSubscription(id: string): Promise<void> {
       const result = await this._subscriptionRepository.blockById(id);
       if(!result){
        throw new UpdateFailedException(SubscriptionError.SUBSCRIPTION_UPDATE_FAILED)
       }
    }

    async unBlockSubscription(id: string): Promise<void> {
        const result = await this._subscriptionRepository.unBlockById(id);
        if(!result){
        throw new UpdateFailedException(SubscriptionError.SUBSCRIPTION_UPDATE_FAILED)
       }
    }

    async findSubscripition(id: string): Promise<ISubscriptionResponseDTO | null> {
        const subscription = await this._subscriptionRepository.findById(id);

        if(!subscription){
            throw new NOtFoundException(SubscriptionError.SUBSCRIPTION_NOT_FOUND)
        }
        const response:ISubscriptionResponseDTO = SubscriptionMapper.toSubscripitionResponse(subscription);
        return response;
    };

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

    async listSubscriptions(params: IListSubscriptionRequestDTO): Promise<IListSubscriptionResponseDTO | null> {

        let {subscription,total} = await this._subscriptionRepository.listAllSubscriptions(params);

        const response:IListSubscriptionResponseDTO = SubscriptionMapper.toListSubscriptionResponse(subscription,total,params);
        return response
    }

};