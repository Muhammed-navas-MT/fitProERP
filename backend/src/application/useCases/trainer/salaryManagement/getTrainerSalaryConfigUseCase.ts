import { TrainerError } from "../../../../presentation/shared/constants/errorMessage/trainerMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { TrainerSalaryConfigResponseDto } from "../../../dtos/trainerDto/trainerSalaryConfigDto";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IGetTrainerSalaryConfigUseCase } from "../../../interfaces/useCase/trainer/salaryManagement/getTrainerSalaryConfigUseCaseInterface";
import { TrainerSalaryConfigMapper } from "../../../mappers/trainer/trainerSalaryConfigMapper";

export class GetTrainerSalaryConfigUseCase implements IGetTrainerSalaryConfigUseCase {
  constructor(private _trainerRepository: ITrainerRepository) {}

  async execute(trainerId: string): Promise<TrainerSalaryConfigResponseDto> {
    const trainer =
      await this._trainerRepository.getSalaryConfigByTrainerId(trainerId);

    if (!trainer) {
      throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND);
    }

    return TrainerSalaryConfigMapper.toResponseDto(trainer);
  }
}
