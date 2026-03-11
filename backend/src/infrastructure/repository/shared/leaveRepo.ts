import { FilterQuery, Model } from "mongoose";
import { ILeaveRepository } from "../../../application/interfaces/repository/shared/leaveRepoInterface";
import { ITrainerLeaveEntity } from "../../../domain/entities/gymAdmin/TrainerLeaveEntity";
import { BaseRepository } from "../base/baseRepo";
import { ITrainerLeaveModel } from "../databaseConfigs/models/trainerLeaveModel";
import { ListLeavesRequestDto } from "../../../application/dtos/shared/leaveDto";

export class LeaveRepository
  extends BaseRepository<ITrainerLeaveModel>
  implements ILeaveRepository
{
  constructor(model: Model<ITrainerLeaveModel>) {
    super(model);
  }

  async findOverlappingLeave(
    trainerId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<ITrainerLeaveEntity[]> {
    const leaves = await this._model.find({
      trainerId,
      startDate: { $lte: endDate },
      endDate: { $gte: startDate },
    });

    return leaves;
  }
  async findAllLeavesByTrainerId(
    params: ListLeavesRequestDto,
    trainerId: string,
  ): Promise<{ leaves: ITrainerLeaveEntity[]; total: number }> {
    const { search, limit, page, status } = params;
    const filter: FilterQuery<ITrainerLeaveModel> = {
      trainerId,
    };
    if (status) {
      filter.status = status;
    }
    if (search && search.trim() !== "") {
      filter.reason = {
        $regex: search,
        $options: "i",
      };
    }
    const leaves = await this._model
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await this._model.countDocuments(filter);

    return { leaves: leaves.map((leave) => leave.toObject()), total };
  }
}
