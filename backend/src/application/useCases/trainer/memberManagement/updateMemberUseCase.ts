import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IUpdateMemberUseCase } from "../../../interfaces/useCase/trainer/memberManagement/updateMemberUseCaseInterface";

export class UpdateMemberUseCase implements IUpdateMemberUseCase {
  constructor(private readonly _memberRepository: IMemberRepository) {}

  async updateMember(
  member: { trainerId: string; branchId: string },
  memberId: string
): Promise<boolean> {
  const existingMember = await this._memberRepository.findById(memberId);

  if (!existingMember) {
    throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
  }

  const isBranchChanged = existingMember.branchId?.toString() !== member.branchId;

  if (
    existingMember.branchId?.toString() === member.branchId &&
    existingMember.trainerId.toString() === member.trainerId
  ) {
    return false;
  }

  await this._memberRepository.update(member, memberId);
  return isBranchChanged;
}
}
