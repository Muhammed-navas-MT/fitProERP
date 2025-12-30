import { BaseRepository } from "../base/baseRepo";
import { ITrainerModel } from "../databaseConfigs/models/trainerModel";
import { ITrainerRepository } from "../../../application/interfaces/repository/trainer.ts/tranerRepoInterface";
import { Model } from "mongoose";
import { TrainerEntity } from "../../../domain/entities/trainer/trainerEntity";

export class TrainerRepository extends BaseRepository<ITrainerModel> implements ITrainerRepository {
    constructor(model:Model<ITrainerModel>){
        super(model)
    };

    async findByEmail(email: string): Promise<TrainerEntity | null> {
        const doc = await this._model.findOne({email});
        if(!doc)return null
        return doc
    }

    async countByBranchId(branchId: string): Promise<number> {
    return this._model.countDocuments({
      branchId,
      isActive: true,
    });
  }
}