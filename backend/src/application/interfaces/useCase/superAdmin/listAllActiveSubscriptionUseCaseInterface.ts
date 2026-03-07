import { IListActiveSubscriptionResponseDTO } from "../../../dtos/gymAdminDto/subscriptionDto";

export interface IListAllActiveSubscriptionUseCase{
    listAllSubscription():Promise<IListActiveSubscriptionResponseDTO|null>
}