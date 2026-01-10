import { TrainerError } from "../../../../presentation/shared/constants/errorMessage/trainerMessage";
import { BadRequestException, NOtFoundException } from "../../../constants/exceptions";
import { IChangePasswordRequestDTO } from "../../../dtos/trainerDto/listAllTrainerDto";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IHashService } from "../../../interfaces/service/hashServiceInterface";
import { IChangePasswordUseCase } from "../../../interfaces/useCase/trainer/profileManagement/changePasswordUseCaseInterface";

export class ChangePasswordUseCase implements IChangePasswordUseCase {
  constructor(
    private _trainerRepository: ITrainerRepository,
    private _hashService:IHashService,
) {}

  async execute(data: IChangePasswordRequestDTO): Promise<void> {
    const trainer = await this._trainerRepository.findById(data.trainerId);
    if (!trainer) throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND);
    console.log(trainer)
    const isMatch = await this._hashService.compare(data.oldPassword,trainer.password);
    if (!isMatch) {
      throw new BadRequestException(TrainerError.OLD_PASSWORD_INCORRECT);
    }

    const hashedPassword = await this._hashService.hash(data.newPassword);
    await this._trainerRepository.update(
      {password:hashedPassword},
      data.trainerId
    );
  }
}
