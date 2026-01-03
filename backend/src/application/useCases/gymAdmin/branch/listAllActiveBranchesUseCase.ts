import { BranchError } from "../../../../presentation/shared/constants/messages/branchMessages";
import { ForbiddenException } from "../../../constants/exceptions";
import { IListActiveBranchResponseDTO } from "../../../dtos/gymAdminDto/BranchDto";
import { IBranchRepository } from "../../../interfaces/repository/gymAdmin/branchRepoInterface";
import { IListActiveBranchUseCase } from "../../../interfaces/useCase/gymAdmin/branch/listAllActiveBranchUseCaseInterface";
import { BranchResponseMapper } from "../../../mappers/gymAdmin/branchMapper";

export class ListActveBranchUseCase implements IListActiveBranchUseCase {
  constructor(
    private readonly branchRepository: IBranchRepository
  ) {}

  async listActiveBranch(
    gymId: string
  ): Promise<IListActiveBranchResponseDTO | null> {
    try {
      if (!gymId) {
        throw new ForbiddenException(BranchError.ID_REQUIRED);
      }
      const branches = await this.branchRepository.listAllActiveBranch(gymId);
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
