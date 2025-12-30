import { IBranchRepository } from "../../../interfaces/repository/gymAdmin/branchRepoInterface";
import { BranchStatus } from "../../../../domain/enums/branchStatus";
import { IUnBlockBranchUseCase } from "../../../interfaces/useCase/gymAdmin/branch/unBlockBranchUseCaseInterface";
import { InvalidIdException, NOtFoundException } from "../../../constants/exceptions";
import { BranchError } from "../../../../presentation/shared/constants/messages/branchMessages";

export class UnBlockBranchUseCase implements IUnBlockBranchUseCase {
  constructor(
    private readonly _branchRepository: IBranchRepository
  ) {}
  async unBlockBranch(branchId: string): Promise<void> {
    if (!branchId) {
      throw new InvalidIdException(BranchError.BRANCH_ID_REQUIRED);
    }
    const branch = await this._branchRepository.findById(branchId);
    if (!branch) {
      throw new NOtFoundException(BranchError.BRANCH_NOT_FOUND);
    }
    if (branch.status === BranchStatus.ACTIVE) {
      return;
    }
    await this._branchRepository.update({status: BranchStatus.ACTIVE},branchId);
  }
}
