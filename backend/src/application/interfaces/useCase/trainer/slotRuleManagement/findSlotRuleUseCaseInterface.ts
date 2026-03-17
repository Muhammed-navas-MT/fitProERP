import { FindSlotRuleResponseDto } from "../../../../dtos/trainerDto/slotRuleDtos";

export interface IFindSlotRuleUseCase {
  execute(trainerId: string): Promise<FindSlotRuleResponseDto | null>;
}
