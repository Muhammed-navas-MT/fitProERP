import { ICreatePackageRequestDTO } from "../../../../dtos/gymAdminDto/packageDto";

export interface ICreatePackageUseCase {
    execute(data:ICreatePackageRequestDTO,gymId:string):Promise<void>;
}