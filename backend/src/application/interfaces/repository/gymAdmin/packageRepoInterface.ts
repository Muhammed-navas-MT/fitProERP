import { IBaseRepository } from "../base/baseRepo";
import { PackageEntity } from "../../../../domain/entities/gymAdmin/packageEntity";
import { IListPackageRequestDTO } from "../../../dtos/gymAdminDto/packageDto";

export interface IPackageRespository extends IBaseRepository<PackageEntity>{
    findByNameAndBranch(name:string,branchId:string):Promise<PackageEntity|null>;
    listAllPackage(params:IListPackageRequestDTO,gymId:string):Promise<{packages:PackageEntity[],total:number}>;
    listAllActivePackage():Promise<PackageEntity[]|null>;
}