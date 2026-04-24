import { MemberError } from "../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../constants/exceptions";
import { IMemberRepository } from "../../interfaces/repository/member/addMemberRepoInterface";
import { IShowGymDetailUseCase } from "../../interfaces/useCase/member/showGymDetailUseCaseInterface";

export class ShowGymDetailUseCase implements IShowGymDetailUseCase {
  constructor(private _memberRepository: IMemberRepository) {}
  async execute(memberId: string): Promise<{ logo: string; gymName: string }> {
    const memberAndGymDetails =
      await this._memberRepository.getMemberGymDetail(memberId);
    if (!memberAndGymDetails) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }
    return {
      gymName: memberAndGymDetails.gymId.gymName,
      logo: memberAndGymDetails.gymId.logo,
    };
  }
}
