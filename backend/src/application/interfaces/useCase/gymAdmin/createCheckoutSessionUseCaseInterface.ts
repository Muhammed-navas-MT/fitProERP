import { CreateCheckoutSessionRequestDto } from "../../../dtos/gymAdminDto/purchaseSubscriptionDto";

export interface ICreateCheckoutSessionUseCase {
    execute(data:CreateCheckoutSessionRequestDto):Promise<string>;
}