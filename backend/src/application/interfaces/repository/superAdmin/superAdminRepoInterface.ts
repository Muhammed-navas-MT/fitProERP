import { SuperAdminEntity } from "../../../../domain/entities/superAdmin/superAdminEntity";

export interface ISuperAdminRepository{
    findByEmail(email:string):Promise<SuperAdminEntity | null>;
}