import { TrainerError } from "../../../../presentation/shared/constants/errorMessage/trainerMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { IUpdateTrainerDTO } from "../../../dtos/trainerDto/listAllTrainerDto";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IUpdateProfileUseCase } from "../../../interfaces/useCase/trainer/profileManagement/updateProfileUseCaseInterface";

    export class UpdateProfileUseCase implements IUpdateProfileUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute(data: IUpdateTrainerDTO,trainerId:string): Promise<void> {
    const trainer = await this.trainerRepository.findById(trainerId);
    if (!trainer) throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND);

    await this.trainerRepository.update(
      data,
      trainerId
    );
  }
}
