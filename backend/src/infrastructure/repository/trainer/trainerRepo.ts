import { BaseRepository } from "../base/baseRepo";
import { ITrainerModel } from "../databaseConfigs/models/trainerModel";
import { ITrainerRepository } from "../../../application/interfaces/repository/trainer.ts/tranerRepoInterface";
import { Model } from "mongoose";
import { TrainerEntity } from "../../../domain/entities/trainer/trainerEntity";
import { IListTrainerRequestDTO } from "../../../application/dtos/trainerDto/listAllTrainerDto";

export class TrainerRepository extends BaseRepository<ITrainerModel> implements ITrainerRepository {
    constructor(model:Model<ITrainerModel>){
        super(model)
    };

    async findByEmail(email: string): Promise<TrainerEntity | null> {
        const doc = await this._model.findOne({email});
        if(!doc)return null
        return doc
    };

    async listAllTrainers(params: IListTrainerRequestDTO): Promise<{ trainers: TrainerEntity[]; total: number; }> {
        const skip = (params.page-1)* params.limit;
        const search = params.search?.trim();
        const gymId = params.gymId
        const filter = search ? {gymId,name:{$regex:search,$options:"i"}}:{gymId};
        const trainers = await this._model
        .find(filter)
        .skip(skip)
        .limit(params.limit)
        .sort({createdAt:-1});
        const total = await this._model.countDocuments(filter);
        return {trainers:trainers,total:total};
    }

    async countTrainersByGymId(gymId: string): Promise<number> {
        return await this._model.countDocuments({gymId})
    }
}