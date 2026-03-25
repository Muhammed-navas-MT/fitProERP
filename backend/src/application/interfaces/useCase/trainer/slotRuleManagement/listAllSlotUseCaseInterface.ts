import { AvailableSlotResponseDto } from "../../../../dtos/trainerDto/slotRuleDtos";

export interface IListAllSlotUseCase {
  execute(trainerId: string): Promise<AvailableSlotResponseDto>;
}
