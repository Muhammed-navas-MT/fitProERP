import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { UpdateMemberDTO } from "../../../dtos/auth/memberDto";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IUpdateMemberUseCase } from "../../../interfaces/useCase/gymAdmin/memberManagement/updateMemberUseCaseInterface";
import { TrainerMapper } from "../../../mappers/memeberMapper";

export class UpdateMemberUseCase implements IUpdateMemberUseCase {
  constructor(private readonly _memberRepository: IMemberRepository) {}

  async updateMember(member: UpdateMemberDTO,memberId:string): Promise<void> {
    const existingMember = await this._memberRepository.findById(memberId);
    if (!existingMember) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }
    const memberData = TrainerMapper.toUpdateMemberEntity(member);
    await this._memberRepository.update(memberData,memberId)
  }
}
