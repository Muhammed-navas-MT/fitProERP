import { FindSlotRuleResponseDto } from "../../../dtos/trainerDto/slotRuleDtos";
import { ISlotRuleRepository } from "../../../interfaces/repository/trainer.ts/slotRuleRepoInterface";
import { IFindSlotRuleUseCase } from "../../../interfaces/useCase/trainer/slotRuleManagement/findSlotRuleUseCaseInterface";
import { SlotRuleMapper } from "../../../mappers/trainer/slotRuleMapper";

export class FindSlotRuleUseCase implements IFindSlotRuleUseCase {
  constructor(private _slotRuleRepository: ISlotRuleRepository) {}
  async execute(trainerId: string): Promise<FindSlotRuleResponseDto | null> {
    const slotRule = await this._slotRuleRepository.findByTrainerId(trainerId);
    if (!slotRule) {
      return null;
    }
    const response = SlotRuleMapper.toFindResponse(slotRule);
    return response;
  }
}
