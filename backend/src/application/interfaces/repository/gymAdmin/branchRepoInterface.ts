import { IBranchEntity } from "../../../../domain/entities/gymAdmin/branchEntity";
import { IFindByNameAndLocationDTO, IListBranchRequestDTO } from "../../../dtos/gymAdminDto/BranchDto";
import { IBaseRepository } from "../base/baseRepo";

export interface IBranchRepository extends IBaseRepository<IBranchEntity>{
    findByNameAndLocation(params:IFindByNameAndLocationDTO):Promise<IBranchEntity|null>
    listAllBranch(params:IListBranchRequestDTO):Promise<{branch:IBranchEntity[],total:number}>
    listAllActiveBranch(gymId: string): Promise<IBranchEntity[]>
}