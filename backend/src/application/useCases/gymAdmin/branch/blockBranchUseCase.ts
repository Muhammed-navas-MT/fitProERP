import { IBranchRepository } from "../../../interfaces/repository/gymAdmin/branchRepoInterface";
import { IBlockBranchUseCase } from "../../../interfaces/useCase/gymAdmin/branch/blockBranchUseCaseInterface";
import { BranchStatus } from "../../../../domain/enums/branchStatus";
import { InvalidIdException, NOtFoundException } from "../../../constants/exceptions";
import { BranchError } from "../../../../presentation/shared/constants/messages/branchMessages";

export class BlockBranchUseCase implements IBlockBranchUseCase {
  constructor(
    private readonly _branchRepository: IBranchRepository
  ) {}
  async blockBranch(branchId: string): Promise<void> {
    if (!branchId) {
      throw new InvalidIdException(BranchError.BRANCH_ID_REQUIRED);
    }
    const branch = await this._branchRepository.findById(branchId);
    if (!branch) {
      throw new NOtFoundException(BranchError.BRANCH_NOT_FOUND);
    }
    if (branch.status === BranchStatus.IN_ACTIVE) {
      return;
    }
    await this._branchRepository.update({status: BranchStatus.IN_ACTIVE},branchId, );
  }
}
