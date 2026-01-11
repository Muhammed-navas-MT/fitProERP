import { IListPackageRequestDTO, IListPackageResponseDTO } from "../../../../dtos/gymAdminDto/packageDto";

export interface IListPackageUseCase {
    execute(params:IListPackageRequestDTO,gymId:string):Promise<IListPackageResponseDTO|null>
}