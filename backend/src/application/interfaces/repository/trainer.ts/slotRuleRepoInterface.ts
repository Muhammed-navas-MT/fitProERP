import { SlotRuleEntity } from "../../../../domain/entities/trainer/slotRuleEntity";
import { IBaseRepository } from "../base/baseRepo";

export interface ISlotRuleRepository extends IBaseRepository<SlotRuleEntity> {
  findByTrainerId(trainerId: string): Promise<SlotRuleEntity | null>;
}
