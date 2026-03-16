import { Model } from "mongoose";
import { IDietPlanRepository } from "../../../application/interfaces/repository/member/dietPlanRepoInterface";
import { BaseRepository } from "../base/baseRepo";
import { IDietPlanModel } from "../databaseConfigs/models/deitPlanModel";
import { DietPlanEntity } from "../../../domain/entities/member/dietEntity";

export class DietPlanRepository
  extends BaseRepository<IDietPlanModel>
  implements IDietPlanRepository
{
  constructor(model: Model<IDietPlanModel>) {
    super(model);
  }
  async findByMemberId(memberId: string): Promise<string> {
    const result = await this._model.findOne({ memberId });

    if (!result) {
      return "";
    }

    return result._id.toString();
  }
  async findDiet(memberId: string): Promise<DietPlanEntity | null> {
    return await this._model.findOne({ memberId }).lean();
  }
}
