import { UpdateSlotRuleRequestDto } from "../../../../dtos/trainerDto/slotRuleDtos";

export interface IUpdateSlotRuleUseCase {
  execute(data: UpdateSlotRuleRequestDto, slotRuleId: string): Promise<void>;
}
