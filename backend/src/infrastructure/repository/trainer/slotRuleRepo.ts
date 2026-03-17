import { Model } from "mongoose";
import { ISlotRuleRepository } from "../../../application/interfaces/repository/trainer.ts/slotRuleRepoInterface";
import { BaseRepository } from "../base/baseRepo";
import { ISlotRuleModel } from "../databaseConfigs/models/slotRuleModel";
import { SlotRuleEntity } from "../../../domain/entities/trainer/slotRuleEntity";

export class SlotRuleRepository
  extends BaseRepository<ISlotRuleModel>
  implements ISlotRuleRepository
{
  constructor(model: Model<ISlotRuleModel>) {
    super(model);
  }
  async findByTrainerId(trainerId: string): Promise<SlotRuleEntity | null> {
    const result = await this._model.findOne({ trainerId }).lean();

    if (!result) {
      return null;
    }

    return result;
  }
}
