import { BranchError } from "../../../../presentation/shared/constants/messages/branchMessages";
import { InvalidIdException } from "../../../constants/exceptions";
import {
  IListBranchRequestDTO,
  IListBranchResponseDTO,
} from "../../../dtos/gymAdminDto/BranchDto";
import { IBranchRepository } from "../../../interfaces/repository/gymAdmin/branchRepoInterface";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IListBranchUseCase } from "../../../interfaces/useCase/gymAdmin/branch/listBranchUseCaseInterface";
import { BranchResponseMapper } from "../../../mappers/gymAdmin/branchMapper";

export class ListBranchUseCase implements IListBranchUseCase {
  constructor(
    private readonly _branchRepository: IBranchRepository,
    private readonly _memberRepository: IMemberRepository,
    private readonly _trainerRepository: ITrainerRepository
  ) {}

  async listBranch(
    params: IListBranchRequestDTO
  ): Promise<IListBranchResponseDTO> {
    const { gymId, page = 1, limit = 10, search } = params;
    if (!gymId) {
      throw new InvalidIdException(BranchError.GYM_ID_REQUIRED);
    }

    const { branch, total } =
      await this._branchRepository.listAllBranch({
        gymId,
        page,
        limit,
        search,
      });

    const enrichedBranches = await Promise.all(
    branch.map(async (b) => {
      const [membersCount, staffCount] = await Promise.all([
        this._memberRepository.countByBranchId(b._id!),
        this._trainerRepository.countByBranchId(b._id!),
      ]);
      return {
        branch: b,
        membersCount,
        staffCount,
        phone: b.phone,
      };
    })
  );
  return BranchResponseMapper.toListItem(enrichedBranches, total);
  };
}
