import { TrainerError } from "../../../../presentation/shared/constants/errorMessage/trainerMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { TrainerDTO } from "../../../dtos/trainerDto/listAllTrainerDto";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IViewProfileUseCase } from "../../../interfaces/useCase/trainer/profileManagement/viewProfileUseCaseInterface";
import { TrainerMapper } from "../../../mappers/trainerMapper";

export class ViewProfileUseCase implements IViewProfileUseCase {
  constructor(private readonly trainerRepository: ITrainerRepository) {}

  async execute(trainerId: string): Promise<TrainerDTO> {
    const trainer = await this.trainerRepository.findById(trainerId);
    if (!trainer) throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND    );

    return TrainerMapper.toFindTrainerResponse(trainer);
  }
}
