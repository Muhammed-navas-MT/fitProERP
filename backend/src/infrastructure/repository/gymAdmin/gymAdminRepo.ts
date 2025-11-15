import { IGymAdminRepository } from "../../../application/interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IGymAdminModel } from "../databaseConfigs/models/gymAdminModel";
import { GymAdminEntity } from "../../../domain/entities/gymAdmin/gymAdminEntity";
import { Model } from "mongoose";
import { BaseRepository } from "../base/baseRepo";


export class GymAdminRepository extends BaseRepository<IGymAdminModel> implements IGymAdminRepository {
    constructor(model:Model<IGymAdminModel>){
        super(model)
    };

    async findByEmail(email: string): Promise<boolean> {
        const doc = await this._model.findOne({email});
        return !!doc
    }
}