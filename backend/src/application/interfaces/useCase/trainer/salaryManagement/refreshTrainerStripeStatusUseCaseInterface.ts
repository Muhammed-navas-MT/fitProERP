import {
  RefreshTrainerStripeStatusDto,
  TrainerSalaryConfigResponseDto,
} from "../../../../dtos/trainerDto/trainerSalaryConfigDto";

export interface IRefreshTrainerStripeStatusUseCase {
  execute(
    data: RefreshTrainerStripeStatusDto,
  ): Promise<TrainerSalaryConfigResponseDto>;
}
