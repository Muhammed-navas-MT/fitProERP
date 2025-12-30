import { IBranchEntity } from "../../../../../domain/entities/gymAdmin/branchEntity";

export interface ICreateBranchUseCase {
    createBranch(branch:IBranchEntity):Promise<void>;
}