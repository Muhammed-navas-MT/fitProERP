import { IViewPackageResponseDTO } from "../../../../dtos/gymAdminDto/packageDto";

export interface IViewPackageUseCase {
    execute(id:string):Promise<IViewPackageResponseDTO|null>;
}