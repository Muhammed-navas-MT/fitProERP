import { SuperAdminEntity } from "../../../domain/entities/superAdmin/superAdminEntity";
import { ISuperAdminRepository } from "../../../application/interfaces/repository/superAdmin/superAdminRepoInterface";
import { Model } from "mongoose";
import { ISuperAdminModel } from "../databaseConfigs/models/superAdminModel";
import { Roles } from "../../../domain/enums/roles";
import { SuperAdminMapper } from "../../../application/mappers/superAdminMapper";


export class SuperAdminRepository implements ISuperAdminRepository {
    constructor(protected _model:Model<ISuperAdminModel>){};

    async findByEmail(email: string): Promise<SuperAdminEntity | null> {
        const doc = await this._model.findOne({email});
        if(!doc){
            return null
        }
        return doc;
    }
}