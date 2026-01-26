import { IListActiveSubscriptionResponseDTO } from "../../../dtos/gymAdminDto/subscriptionDto";

export interface IListAllActiveSubscriptionUseCase{
    listAllSubscription(gymId:string):Promise<IListActiveSubscriptionResponseDTO|null>
}