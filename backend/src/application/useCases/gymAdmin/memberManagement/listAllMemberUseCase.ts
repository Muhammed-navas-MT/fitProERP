import { Status } from "../../../../domain/enums/status";
import { GymAdminAuthError } from "../../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { ForbiddenException, NOtFoundException } from "../../../constants/exceptions";
import { IListMemberInGymRequestDTO, IListMemberResponseDTO } from "../../../dtos/memberDto/listAllMembersDto";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IListAllMemberUseCase } from "../../../interfaces/useCase/gymAdmin/memberManagement/listMembersUseCaseInterface";
import { MemberMapper } from "../../../mappers/memeberMapper";

export class ListAllMemberUseCase implements IListAllMemberUseCase {
  constructor(
    private readonly _memberRepository: IMemberRepository,
    private readonly _gymAdminRepository: IGymAdminRepository
  ) {}

  async listAllMembers(
    params: IListMemberInGymRequestDTO
  ): Promise<IListMemberResponseDTO | null> {

    const gym = await this._gymAdminRepository.findById(params.gymId);
    if (!gym) {
      throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
    }

    if (gym.status !== Status.ACTIVE) {
      throw new ForbiddenException(GymAdminAuthError.GYM_NOT_ACTIVE);
    }

    const { members, total } =
      await this._memberRepository.listAllMembersByGymId(params);

    return MemberMapper.toListMemebersByGymResponse(
      members,
      total,
      params
    );
  }
}
