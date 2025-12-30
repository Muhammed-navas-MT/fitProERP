import { IBranchEntity } from "../../../../domain/entities/gymAdmin/branchEntity";
import { Status } from "../../../../domain/enums/status";
import { BranchError } from "../../../../presentation/shared/constants/messages/branchMessages";
import { AlreadyExistException, ForbiddenException, InvalidDataException, NOtFoundException } from "../../../constants/exceptions";
import { IBranchRepository } from "../../../interfaces/repository/gymAdmin/branchRepoInterface";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ICreateBranchUseCase } from "../../../interfaces/useCase/gymAdmin/branch/createBranchUseCaseInterface";

export class CreateBranchUseCase implements ICreateBranchUseCase {
  constructor(
    private readonly _branchRepository: IBranchRepository,
    private readonly _gymRepository: IGymAdminRepository
  ) {}

  async createBranch(branch: IBranchEntity): Promise<void> {
    if (!branch || !branch.gymId) {
      throw new InvalidDataException(BranchError.INVALID_DATA);
    }

    const gym = await this._gymRepository.findById(branch.gymId);
    if (!gym) {
      throw new NOtFoundException(BranchError.GYM_NOT_FOUND);
    }
    if(gym.status !== Status.ACTIVE){
        throw new ForbiddenException(BranchError.GYM_NOT_ACTIVE)
    }

    const existingBranch =
      await this._branchRepository.findByNameAndLocation({
        gymId:branch.gymId,
        branchName:branch.branchName,
        city:branch.address.city,
        pincode:branch.address.pincode
      });
    if (existingBranch) {
      throw new AlreadyExistException(BranchError.ALREADY_EXISTS);
    }

    const createdBranch = await this._branchRepository.create(branch);
    if (!createdBranch) {
      throw new ForbiddenException(BranchError.CREATION_FAILD);
    };

    gym.branches?.push(createdBranch)
    await this._gymRepository.update(
        {branches:gym.branches},
        branch.gymId
    );
  }
}
