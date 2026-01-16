import { IMemberRepository } from "../../../application/interfaces/repository/member/addMemberRepoInterface";
import { BadRequestException } from "../../../application/constants/exceptions";
import { IAttendanceViewRule } from "../../../application/interfaces/service/attendanceViewRule";
import { MemberError } from "../../../presentation/shared/constants/errorMessage/memberMessage";

export class MemberAttendanceViewRule implements IAttendanceViewRule {
  constructor(
    private readonly memberRepository: IMemberRepository
  ) {}

  async resolveBranchId(userId: string): Promise<string[]> {
    const member = await this.memberRepository.findById(userId);

    if (!member) {
      throw new BadRequestException(MemberError.MEMBER_NOT_FOUND);
    }

    return [];
  }
}
