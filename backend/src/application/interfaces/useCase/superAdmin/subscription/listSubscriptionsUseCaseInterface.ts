import { IListSubscriptionRequestDTO, IListSubscriptionResponseDTO } from "../../../../dtos/superAdminDto/subscriptionDto";

export interface IListSubscriptionUseCase {
    listSubscriptions(params:IListSubscriptionRequestDTO):Promise<IListSubscriptionResponseDTO|null>
}