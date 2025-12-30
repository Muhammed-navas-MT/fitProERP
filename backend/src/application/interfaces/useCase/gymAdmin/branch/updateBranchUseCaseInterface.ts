import { IBranchEntity } from "../../../../../domain/entities/gymAdmin/branchEntity";

export interface IUpdateBranchUseCase {
    updateBranch(branch:IBranchEntity,id:string):Promise<void>;
}