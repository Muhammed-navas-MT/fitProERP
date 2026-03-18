import { AvailableSlotResponseDto } from "../../../../dtos/memberDto/slotAndBookingDto";

export interface IListAllAvailableSlotUseCase {
  execute(memberId: string): Promise<AvailableSlotResponseDto>;
}
