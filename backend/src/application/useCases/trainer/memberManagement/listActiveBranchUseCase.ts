import { BranchError } from "../../../../presentation/shared/constants/messages/branchMessages";
import { ForbiddenException } from "../../../constants/exceptions";
import { IListActiveBranchResponseDTO } from "../../../dtos/gymAdminDto/BranchDto";
import { IBranchRepository } from "../../../interfaces/repository/gymAdmin/branchRepoInterface";
import { IListActiveBranchUseCase } from "../../../interfaces/useCase/trainer/listActiveBranchUseCaseIterface";
import { BranchResponseMapper } from "../../../mappers/gymAdmin/branchMapper";

export class ListActiveBranchUseCase implements IListActiveBranchUseCase {
    constructor(
        private _branchRepository:IBranchRepository
    ){}
    async listActiveBranch(trainerId: string): Promise<IListActiveBranchResponseDTO | null> {
       try {
             if (!trainerId) {
               throw new ForbiddenException(BranchError.ID_REQUIRED);
             }
             const branches = await this._branchRepository.listAllActiveBranch(trainerId);
             return BranchResponseMapper.toListActiveItem(branches);
       
           } catch (error) {
             if (error instanceof ForbiddenException) {
               throw error;
             }
             throw new ForbiddenException(
               BranchError.FAILED_TO_LIST_ACTIVE_BRANCH
             );
        }
    }
}