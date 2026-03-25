import {
  AvailableSlotRequestDto,
  AvailableSlotResponseDto,
} from "../../../../dtos/memberDto/slotAndBookingDto";

export interface IListAllAvailableSlotUseCase {
  execute(params: AvailableSlotRequestDto): Promise<AvailableSlotResponseDto>;
}
