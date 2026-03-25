import { SlotRuleEntity } from "../../../../domain/entities/trainer/slotRuleEntity";
import { TrainerError } from "../../../../presentation/shared/constants/errorMessage/trainerMessage";
import {
  BadRequestException,
  NOtFoundException,
} from "../../../constants/exceptions";
import { CreateSlotRuleRequestDTO } from "../../../dtos/trainerDto/slotRuleDtos";
import { ISlotRuleRepository } from "../../../interfaces/repository/trainer.ts/slotRuleRepoInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IRRuleService } from "../../../interfaces/service/RRuleserviceInterface";
import { ICreateSlotRuleUseCase } from "../../../interfaces/useCase/trainer/slotRuleManagement/createSlotRuleUseCaseInterface";

export class CreateSlotRuleUseCase implements ICreateSlotRuleUseCase {
  constructor(
    private _slotRuleRepository: ISlotRuleRepository,
    private _rruleService: IRRuleService,
    private _trainerRepository: ITrainerRepository,
  ) {}

  async execute(data: CreateSlotRuleRequestDTO): Promise<void> {
    const start = new Date(data.startDate);
    const end = data.endDate ? new Date(data.endDate) : undefined;

    const trainer = await this._trainerRepository.findById(data.trainerId);

    if (!trainer) {
      throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND);
    }

    if (data.slots.length > trainer.sessionCount) {
      throw new BadRequestException(
        `The maximum number of sessions allowed per day is ${trainer.sessionCount}. Please reduce the number of slots.`,
      );
    }

    const rrule = this._rruleService.createDailyRule(start, end);

    const existRule = await this._slotRuleRepository.findByTrainerId(
      data.trainerId,
    );

    const slotRuleData: SlotRuleEntity = {
      ...data,
      rrule,
      isActive: true,
    };

    if (existRule) {
      await this._slotRuleRepository.update(
        slotRuleData,
        existRule._id?.toString() as string,
      );
      return;
    }

    await this._slotRuleRepository.create(slotRuleData);
  }
}
