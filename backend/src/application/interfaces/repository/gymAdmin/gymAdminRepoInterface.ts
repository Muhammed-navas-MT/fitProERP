import { GymAdminEntity } from "../../../../domain/entities/gymAdmin/gymAdminEntity";
import { IBaseRepository } from "../base/baseRepo";
import { Status } from "../../../../domain/enums/status";


export interface IGymAdminRepository extends IBaseRepository<GymAdminEntity> {
    findByEmail(email:string):Promise<GymAdminEntity|null>
}