import { Model } from "mongoose";
import { IProgressRepository } from "../../../application/interfaces/repository/member/progressRepoInterface";
import { BaseRepository } from "../base/baseRepo";
import { IProgressModel } from "../databaseConfigs/models/progressModel";
import { IListProgressRequestDto } from "../../../application/dtos/memberDto/progressDto";
import { ProgressEntity } from "../../../domain/entities/member/progressEntity";

export class ProgressRepository
  extends BaseRepository<IProgressModel>
  implements IProgressRepository
{
  constructor(model: Model<IProgressModel>) {
    super(model);
  }
  async listAllProgress(
    params: IListProgressRequestDto,
  ): Promise<{ progress: ProgressEntity[]; total: number }> {
    const { memberId, page, limit } = params;

    const skip = (page - 1) * limit;

    const total = await this._model.countDocuments({ memberId });

    const progress = await this._model
      .find({ memberId })
      .sort({ progressDate: -1 })
      .skip(skip)
      .limit(limit)
      .lean<ProgressEntity[]>();

    return { progress, total };
  }
}
