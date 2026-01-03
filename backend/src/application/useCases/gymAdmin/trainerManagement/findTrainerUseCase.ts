import { TrainerError } from "../../../../presentation/shared/constants/errorMessage/trainerMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { TrainerDTO } from "../../../dtos/trainerDto/listAllTrainerDto";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IFindTrainerUseCase } from "../../../interfaces/useCase/gymAdmin/trainerManagement/findTrainerUseCaseInterface";
import { TrainerMapper } from "../../../mappers/trainerMapper";

export class FindTrainerUseCase implements IFindTrainerUseCase {
  constructor(private trainerRepo: ITrainerRepository) {}

  async findTrainer(trainerId: string): Promise<TrainerDTO> {
    const trainer = await this.trainerRepo.findById(trainerId);
    if (!trainer) throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND);
    return TrainerMapper.toFindTrainerResponse(trainer);
  }
}
