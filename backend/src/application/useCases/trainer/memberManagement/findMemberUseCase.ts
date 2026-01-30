import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { MemberDTO } from "../../../dtos/memberDto/listAllMembersDto";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IFindMemberUseCase } from "../../../interfaces/useCase/trainer/memberManagement/findMemberUseCaseInterface";
import { MemberMapper } from "../../../mappers/memeberMapper";

export class FindMemberUseCase implements IFindMemberUseCase {
  constructor(private readonly _memberRepository: IMemberRepository) {}

  async findMember(memberId: string): Promise<MemberDTO> {
    const member = await this._memberRepository.findById(memberId);

    if (!member) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }
    return MemberMapper.toMemberDTO(member);
  }
}
