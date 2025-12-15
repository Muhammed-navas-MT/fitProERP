import { IBaseRepository } from "../base/baseRepo";
import { IGymAdminModel } from "../../../../infrastructure/repository/databaseConfigs/models/gymAdminModel";
import { GymAdminEntity } from "../../../../domain/entities/gymAdmin/gymAdminEntity";


export interface IGymAdminRepository extends IBaseRepository<GymAdminEntity> {
    findByEmail(email:string):Promise<GymAdminEntity|null>
    findBySubdomian(subdomain:string):Promise<GymAdminEntity|null>
}