import { ISingleBranchResponseDTO } from "../../../../dtos/gymAdminDto/BranchDto";

export interface IFindBranchUseCase {
    findBranch(id:string):Promise<ISingleBranchResponseDTO|null>;
}