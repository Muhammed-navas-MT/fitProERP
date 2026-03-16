import { Model } from "mongoose";
import { BaseRepository } from "../base/baseRepo";
import { IWorkoutPlanModel } from "../databaseConfigs/models/workoutPlanModel";
import { IWorkoutPlanRepository } from "../../../application/interfaces/repository/member/workoutPlanRepoInterface";
import { WorkoutPlanEntity } from "../../../domain/entities/member/workoutPlanEntity";

export class WorkoutPlanRepository
  extends BaseRepository<IWorkoutPlanModel>
  implements IWorkoutPlanRepository
{
  constructor(model: Model<IWorkoutPlanModel>) {
    super(model);
  }
  async findByMemberId(memberId: string): Promise<string> {
    const result = await this._model.findOne({ memberId });

    if (!result) {
      return "";
    }

    return result._id.toString();
  }
  async findWorkout(memberId: string): Promise<WorkoutPlanEntity | null> {
    return await this._model.findOne({ memberId }).lean();
  }
}
