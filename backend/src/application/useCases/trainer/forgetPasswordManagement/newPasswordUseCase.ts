import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IHashService } from "../../../interfaces/service/hashServiceInterface";
import { ITrainerNewPasswordUseCase } from "../../../interfaces/useCase/trainer/forgetPasswordManagement/newPassWordUseCaseInterface";

export class TrainerNewPasswordUseCase implements ITrainerNewPasswordUseCase {
  constructor(
    private _trainerRepository: ITrainerRepository,
    private _hashService: IHashService,
    private _gymAdminRepository: IGymAdminRepository,
  ) {}
  async execute(data: {
    email: string;
    password: string;
    subdomain: string;
  }): Promise<void> {
    const gym = await this._gymAdminRepository.findBySubdomian(data.subdomain);

    const member = await this._trainerRepository.findByEmailAndGymId({
      email: data.email,
      gymId: gym?._id?.toString() as string,
    });
    if (!member) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }

    const hashedPassword = await this._hashService.hash(data.password);

    await this._trainerRepository.update(
      { password: hashedPassword },
      member._id?.toString() as string,
    );
  }
}
