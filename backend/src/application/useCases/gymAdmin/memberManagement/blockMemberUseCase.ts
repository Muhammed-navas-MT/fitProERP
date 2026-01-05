import { Status } from "../../../../domain/enums/status";
import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IBlockMemberUseCase } from "../../../interfaces/useCase/gymAdmin/memberManagement/blockMemberUseCaseInterface";

export class BlockMemberUseCase implements IBlockMemberUseCase {
  constructor(private readonly _memberRepository: IMemberRepository) {}

  async blockMember(memberId: string): Promise<void> {
    const member = await this._memberRepository.findById(memberId);

    if (!member) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }
    await this._memberRepository.update(
      { status: Status.BLOCKED },
      memberId
    );
  }
}

