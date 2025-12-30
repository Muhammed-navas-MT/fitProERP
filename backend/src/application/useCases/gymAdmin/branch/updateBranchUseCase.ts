import { IBranchEntity } from "../../../../domain/entities/gymAdmin/branchEntity";
import { BranchError } from "../../../../presentation/shared/constants/messages/branchMessages";
import { ForbiddenException, InvalidIdException, NOtFoundException } from "../../../constants/exceptions";
import { IBranchRepository } from "../../../interfaces/repository/gymAdmin/branchRepoInterface";
import { IUpdateBranchUseCase } from "../../../interfaces/useCase/gymAdmin/branch/updateBranchUseCaseInterface";

export class UpdateBranchUseCase implements IUpdateBranchUseCase {
  constructor(
    private readonly _branchRepository: IBranchRepository
  ) {}

  async updateBranch(branch: IBranchEntity, id: string): Promise<void> {
    if (!id) {
      throw new InvalidIdException(BranchError.BRANCH_ID_REQUIRED);
    }

    if (!branch) {
      throw new ForbiddenException(BranchError.BRANCH_DATA);
    }

    const existingBranch = await this._branchRepository.findById(id);
    if (!existingBranch) {
      throw new NOtFoundException(BranchError.BRANCH_NOT_FOUND);
    }
    await this._branchRepository.update(
      {...branch},
      id
    );
  }
}
