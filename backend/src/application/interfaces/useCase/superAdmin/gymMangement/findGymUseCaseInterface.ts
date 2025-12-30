import { IGymAdminDetailDTO } from "../../../../dtos/superAdminDto/gymManagementDtos";

export interface IFindGymUseCase {
    findGym(id:string):Promise<IGymAdminDetailDTO|null>;
}