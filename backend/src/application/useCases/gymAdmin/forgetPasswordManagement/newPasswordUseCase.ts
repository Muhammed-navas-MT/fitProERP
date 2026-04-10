import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IHashService } from "../../../interfaces/service/hashServiceInterface";
import { IGymAdminNewPasswordUseCase } from "../../../interfaces/useCase/gymAdmin/forgetPasswordManagement/newPassWordUseCaseInterface";

export class GymAdminNewPasswordUseCase implements IGymAdminNewPasswordUseCase {
  constructor(
    private _hashService: IHashService,
    private _gymAdminRepository: IGymAdminRepository,
  ) {}
  async execute(data: { email: string; password: string }): Promise<void> {
    const gymAdmin = await this._gymAdminRepository.findByEmail(data.email);
    if (!gymAdmin) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }

    const hashedPassword = await this._hashService.hash(data.password);

    await this._gymAdminRepository.update(
      { password: hashedPassword },
      gymAdmin._id?.toString() as string,
    );
  }
}
