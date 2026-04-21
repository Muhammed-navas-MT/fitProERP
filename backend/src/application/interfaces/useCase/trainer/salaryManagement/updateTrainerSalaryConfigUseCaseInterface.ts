import {
  TrainerSalaryConfigResponseDto,
  UpdateTrainerSalaryConfigDto,
} from "../../../../dtos/trainerDto/trainerSalaryConfigDto";

export interface IUpdateTrainerSalaryConfigUseCase {
  execute(
    data: UpdateTrainerSalaryConfigDto,
  ): Promise<TrainerSalaryConfigResponseDto>;
}
