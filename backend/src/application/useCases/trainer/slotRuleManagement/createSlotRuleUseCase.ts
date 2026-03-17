import { SlotRuleEntity } from "../../../../domain/entities/trainer/slotRuleEntity";
import { CreateSlotRuleRequestDTO } from "../../../dtos/trainerDto/slotRuleDtos";
import { ISlotRuleRepository } from "../../../interfaces/repository/trainer.ts/slotRuleRepoInterface";
import { IRRuleService } from "../../../interfaces/service/RRuleserviceInterface";
import { ICreateSlotRuleUseCase } from "../../../interfaces/useCase/trainer/slotRuleManagement/createSlotRuleUseCaseInterface";

export class CreateSlotRuleUseCase implements ICreateSlotRuleUseCase {
  constructor(
    private _slotRuleRepository: ISlotRuleRepository,
    private _rruleService: IRRuleService,
  ) {}
  async execute(data: CreateSlotRuleRequestDTO): Promise<void> {
    const start = new Date(data.startDate);
    const end = data.endDate ? new Date(data.endDate) : undefined;

    const rrule = this._rruleService.createDailyRule(start, end);

    const existRule = await this._slotRuleRepository.findByTrainerId(
      data.trainerId,
    );

    if (existRule) {
      await this._slotRuleRepository.update(
        data,
        existRule._id?.toString() as string,
      );
      return;
    }

    const slotRule: SlotRuleEntity = {
      ...data,
      rrule,
      isActive: true,
    };

    await this._slotRuleRepository.create(slotRule);
  }
}
