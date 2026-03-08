import { Model } from "mongoose";
import { IFindProfitRequestDto } from "../../../application/dtos/gymAdminDto/profitDto";
import { BaseRepository } from "../base/baseRepo";
import { IGymAdminProfitModel } from "../databaseConfigs/models/gymAdminProfitModel";
import { IGymAdminProfitEntity } from "../../../domain/entities/gymAdmin/profitEntiry";
import { IProfitRepository } from "../../../application/interfaces/repository/gymAdmin/profitRepoInterface";

export class ProfitRepository
  extends BaseRepository<IGymAdminProfitModel>
  implements IProfitRepository
{
  constructor(model: Model<IGymAdminProfitModel>) {
    super(model);
  }
  async findProfitByPeriod(
    params: IFindProfitRequestDto,
  ): Promise<IGymAdminProfitEntity | null> {
    return await this._model.findOne({
      gymId: params.gymId,
      branchId: params.branchId,
      periodStart: params.start,
      periodEnd: params.end,
    });
  }
}
