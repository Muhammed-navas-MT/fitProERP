import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { BadRequestException, NOtFoundException } from "../../../constants/exceptions";
import { IChangePasswordRequestDTO } from "../../../dtos/memberDto/profileManagementDtos";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IHashService } from "../../../interfaces/service/hashServiceInterface";
import { IChangePasswordUseCase } from "../../../interfaces/useCase/member/profileManagement/changePasswordUseCaseInterface";

export class ChangePasswordUseCase implements IChangePasswordUseCase {
  constructor(
    private _memberRepository: IMemberRepository,
    private _hashService:IHashService,
) {}

  async execute(data: IChangePasswordRequestDTO): Promise<void> {
    const member = await this._memberRepository.findById(data.memberId);
    if (!member) throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    const isMatch = await this._hashService.compare(data.oldPassword,member.password);
    if (!isMatch) {
      throw new BadRequestException(MemberError.OLD_PASSWORD_INCORRECT);
    }

    const hashedPassword = await this._hashService.hash(data.newPassword);
    await this._memberRepository.update(
      {password:hashedPassword},
      data.memberId
    );
  }
}
