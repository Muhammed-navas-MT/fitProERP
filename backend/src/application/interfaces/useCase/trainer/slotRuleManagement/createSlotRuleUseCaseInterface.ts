import { CreateSlotRuleRequestDTO } from "../../../../dtos/trainerDto/slotRuleDtos";

export interface ICreateSlotRuleUseCase {
  execute(data: CreateSlotRuleRequestDTO): Promise<void>;
}
