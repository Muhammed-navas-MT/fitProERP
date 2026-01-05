import { Status } from "../../../../domain/enums/status";
import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IUnBlockMemberUseCase } from "../../../interfaces/useCase/gymAdmin/memberManagement/unBlockMemberUseCaseInterface";

export class UnBlockMemberUseCase implements IUnBlockMemberUseCase {
  constructor(private readonly _memberRepository: IMemberRepository) {}

  async unBlockMember(memberId: string): Promise<void> {
    const member = await this._memberRepository.findById(memberId);

    if (!member) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }

    const packageDetails = member.package;

    let status: Status = Status.IN_ACTIVE;

    if (packageDetails?.planId && packageDetails?.endDate) {
      const today = new Date();
      const endDate = new Date(packageDetails.endDate);

      // 2️⃣ Check subscription validity
      if (endDate >= today) {
        status = Status.ACTIVE;
      }
    }

    // 3️⃣ Update status based on subscription check
    await this._memberRepository.update(
      { status },
      memberId
    );
  }
}
