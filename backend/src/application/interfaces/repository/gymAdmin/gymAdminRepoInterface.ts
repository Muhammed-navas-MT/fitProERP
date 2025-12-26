import { IBaseRepository } from "../base/baseRepo";
import { IGymAdminModel } from "../../../../infrastructure/repository/databaseConfigs/models/gymAdminModel";
import { GymAdminEntity } from "../../../../domain/entities/gymAdmin/gymAdminEntity";
import { IListGymsRequestDTO } from "../../../dtos/gymAdminDto/gymManagementDtos";


export interface IGymAdminRepository extends IBaseRepository<GymAdminEntity> {
    findByEmail(email:string):Promise<GymAdminEntity|null>
    findBySubdomian(subdomain:string):Promise<GymAdminEntity|null>
    listGyms(params:IListGymsRequestDTO):Promise<{ gyms: (GymAdminEntity & { planName: string })[]; total: number }>
}