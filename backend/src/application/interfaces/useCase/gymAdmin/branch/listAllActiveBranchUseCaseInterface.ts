import { IListActiveBranchResponseDTO } from "../../../../dtos/gymAdminDto/BranchDto";

export interface IListActiveBranchUseCase {
    listActiveBranch(gymId:string):Promise<IListActiveBranchResponseDTO|null>
}