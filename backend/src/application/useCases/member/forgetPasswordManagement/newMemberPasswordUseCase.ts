import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IHashService } from "../../../interfaces/service/hashServiceInterface";
import { INewMemberPasswordUseCase } from "../../../interfaces/useCase/member/forgetPasswordManagement/newPassWordUseCaseInterface";

export class NewMemberPasswordUseCase implements INewMemberPasswordUseCase {
  constructor(
    private _memberRepository: IMemberRepository,
    private _hashService: IHashService,
    private _gymAdminRepository: IGymAdminRepository,
  ) {}
  async execute(data: {
    email: string;
    password: string;
    subdomain: string;
  }): Promise<void> {
    console.log(data);
    const gym = await this._gymAdminRepository.findBySubdomian(data.subdomain);
    const member = await this._memberRepository.findByEmailAndGymId({
      email: data.email,
      gymId: gym?._id?.toString() as string,
    });
    if (!member) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }
    const hashedPassword = await this._hashService.hash(data.password);
    await this._memberRepository.update(
      { password: hashedPassword },
      member._id?.toString() as string,
    );
  }
}
