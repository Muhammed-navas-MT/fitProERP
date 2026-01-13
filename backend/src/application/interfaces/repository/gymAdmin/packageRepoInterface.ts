import { IBaseRepository } from "../base/baseRepo";
import { PackageEntity } from "../../../../domain/entities/gymAdmin/packageEntity";
import { IListPackageRequestDTO } from "../../../dtos/gymAdminDto/packageDto";
import { IPackageWithBranch } from "../../../../infrastructure/repository/databaseConfigs/types/packagePersistenceTypes";

export interface IPackageRespository extends IBaseRepository<PackageEntity>{
    findByNameAndBranch(name:string,branchId?:string):Promise<IPackageWithBranch|null>;
    listAllPackage(params:IListPackageRequestDTO,gymId:string):Promise<{packages:IPackageWithBranch[],total:number}>;
    listAllActivePackage():Promise<PackageEntity[]|null>;
    findByIdAndBranch(id:string,branchId?:string):Promise<IPackageWithBranch|null>;
}