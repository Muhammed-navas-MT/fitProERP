import { ISubscriptionResponseDTO } from "../../../../dtos/superAdminDto/subscriptionDto";

export interface IFindSubscriptionUseCase {
    findSubscripition(id:string):Promise<ISubscriptionResponseDTO|null>;
}