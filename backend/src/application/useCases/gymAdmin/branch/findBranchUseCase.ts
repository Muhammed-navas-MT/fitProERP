import { BranchError } from "../../../../presentation/shared/constants/messages/branchMessages";
import { InvalidIdException } from "../../../constants/exceptions";
import { ISingleBranchResponseDTO } from "../../../dtos/gymAdminDto/BranchDto";
import { IBranchRepository } from "../../../interfaces/repository/gymAdmin/branchRepoInterface";
import { IFindBranchUseCase } from "../../../interfaces/useCase/gymAdmin/branch/findBranchUseCaseInterface";
import { BranchResponseMapper } from "../../../mappers/gymAdmin/branchMapper";

export class FindBranchUseCase implements IFindBranchUseCase {
  constructor(
    private readonly _branchRepository: IBranchRepository
  ) {}
  async findBranch(id: string): Promise<ISingleBranchResponseDTO | null> {
    if (!id) {
      throw new InvalidIdException(BranchError.BRANCH_ID_REQUIRED);
    }
    const branch = await this._branchRepository.findById(id);
    if (!branch) {
      return null;
    }
    return BranchResponseMapper.toFindBranchResponse(branch);
  }
}
