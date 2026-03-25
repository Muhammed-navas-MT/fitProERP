import { TrainerError } from "../../../../presentation/shared/constants/errorMessage/trainerMessage";
import {
  BadRequestException,
  NOtFoundException,
} from "../../../constants/exceptions";
import { UpdateSlotRuleRequestDto } from "../../../dtos/trainerDto/slotRuleDtos";
import { ISlotRuleRepository } from "../../../interfaces/repository/trainer.ts/slotRuleRepoInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IRRuleService } from "../../../interfaces/service/RRuleserviceInterface";
import { IUpdateSlotRuleUseCase } from "../../../interfaces/useCase/trainer/slotRuleManagement/updateSlotRuleUseCaseInterface";
import { SlotRuleMapper } from "../../../mappers/trainer/slotRuleMapper";

export class UpdateSlotUseCase implements IUpdateSlotRuleUseCase {
  constructor(
    private _slotRuleRepository: ISlotRuleRepository,
    private _rruleService: IRRuleService,
    private _trainerRepository: ITrainerRepository,
  ) {}

  async execute(
    data: UpdateSlotRuleRequestDto,
    slotRuleId: string,
  ): Promise<void> {
    const findSlotRule = await this._slotRuleRepository.findById(slotRuleId);

    if (!findSlotRule) {
      throw new NOtFoundException("Not found slot rule");
    }

    const trainer = await this._trainerRepository.findById(
      findSlotRule.trainerId,
    );

    if (!trainer) {
      throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND);
    }

    if (data.slots.length > trainer.sessionCount) {
      throw new BadRequestException(
        `The maximum number of sessions allowed per day is ${trainer.sessionCount}. Please reduce the number of slots.`,
      );
    }

    const start = data.startDate
      ? new Date(data.startDate)
      : findSlotRule.startDate;

    const end = data.endDate ? new Date(data.endDate) : findSlotRule.endDate;

    const rrule = this._rruleService.createDailyRule(start, end);

    const slotRuleEntity = SlotRuleMapper.toSlotRuleEntity(
      data,
      findSlotRule,
      rrule,
    );

    await this._slotRuleRepository.update(slotRuleEntity, slotRuleId);
  }
}
