import { CreateMemberCheckoutSessionRequestDto } from "../../../../dtos/memberDto/purchasePackageDto";

export interface ICreateMemberCheckoutSessionUseCase {
    execute(data:CreateMemberCheckoutSessionRequestDto):Promise<string>;
}