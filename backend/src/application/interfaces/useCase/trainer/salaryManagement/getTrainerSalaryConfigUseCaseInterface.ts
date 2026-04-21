import { TrainerSalaryConfigResponseDto } from "../../../../dtos/trainerDto/trainerSalaryConfigDto";

export interface IGetTrainerSalaryConfigUseCase {
  execute(trainerId: string): Promise<TrainerSalaryConfigResponseDto>;
}
