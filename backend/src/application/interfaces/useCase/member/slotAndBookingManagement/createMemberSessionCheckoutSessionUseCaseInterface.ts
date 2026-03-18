import { CreateMemberSessionCheckoutRequestDto } from "../../../../dtos/memberDto/slotAndBookingDto";

export interface ICreateMemberSessionCheckoutSessionUseCase {
  execute(data: CreateMemberSessionCheckoutRequestDto): Promise<string>;
}
