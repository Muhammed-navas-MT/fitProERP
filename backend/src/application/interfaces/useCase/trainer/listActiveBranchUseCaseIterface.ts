import { IListActiveBranchResponseDTO } from "../../../dtos/gymAdminDto/BranchDto";

export interface IListActiveBranchUseCase {
    listActiveBranch(trainerId:string):Promise<IListActiveBranchResponseDTO|null>
}