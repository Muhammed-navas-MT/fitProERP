import { IGymAdminRepository } from "../../../application/interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IGymAdminModel } from "../databaseConfigs/models/gymAdminModel";
import { Model } from "mongoose";
import { BaseRepository } from "../base/baseRepo";
import { GymAdminEntity } from "../../../domain/entities/gymAdmin/gymAdminEntity";


export class GymAdminRepository extends BaseRepository<IGymAdminModel> implements IGymAdminRepository {
    constructor(model:Model<IGymAdminModel>){
        super(model)
    };

    async findByEmail(email: string): Promise<GymAdminEntity | null> {
        const doc = await this._model.findOne({email});
        if(!doc)return null
        return doc
    }
}