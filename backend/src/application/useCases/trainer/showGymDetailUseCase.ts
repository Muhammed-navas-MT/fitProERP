import { TrainerError } from "../../../presentation/shared/constants/errorMessage/trainerMessage";
import { NOtFoundException } from "../../constants/exceptions";
import { ITrainerRepository } from "../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IShowGymDetailUseCase } from "../../interfaces/useCase/trainer/showGymDetailUseCaseInterface";

export class ShowGymDetailUseCase implements IShowGymDetailUseCase {
  constructor(private _trainerRepository: ITrainerRepository) {}
  async execute(trainerId: string): Promise<{ logo: string; gymName: string }> {
    const gymDetails =
      await this._trainerRepository.getTrainerGymDetail(trainerId);
    if (!gymDetails) {
      throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND);
    }
    return {
      gymName: gymDetails.gymId.gymName,
      logo: gymDetails.gymId.logo,
    };
  }
}
