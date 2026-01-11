import { IUpdatePackageRequestDTO } from "../../../../dtos/gymAdminDto/packageDto";

export interface IUpdatePakcageUseCase {
    execute(data:IUpdatePackageRequestDTO,packageId:string):Promise<void>;
}