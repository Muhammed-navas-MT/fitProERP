import { NOtFoundException } from "../../../constants/exceptions";
import { UpdateSlotRuleRequestDto } from "../../../dtos/trainerDto/slotRuleDtos";
import { ISlotRuleRepository } from "../../../interfaces/repository/trainer.ts/slotRuleRepoInterface";
import { IUpdateSlotRuleUseCase } from "../../../interfaces/useCase/trainer/slotRuleManagement/updateSlotRuleUseCaseInterface";
import { SlotRuleMapper } from "../../../mappers/trainer/slotRuleMapper";

export class UpdateSlotUseCase implements IUpdateSlotRuleUseCase {
  constructor(private _slotRuleRepository: ISlotRuleRepository) {}
  async execute(
    data: UpdateSlotRuleRequestDto,
    slotRuleId: string,
  ): Promise<void> {
    const findSlotRule = await this._slotRuleRepository.findById(slotRuleId);

    if (!findSlotRule) {
      throw new NOtFoundException("Not found slot rule");
    }
    const slotRuleEntity = SlotRuleMapper.toSlotRuleEntity(data, findSlotRule);

    await this._slotRuleRepository.update(slotRuleEntity, slotRuleId);
  }
}
