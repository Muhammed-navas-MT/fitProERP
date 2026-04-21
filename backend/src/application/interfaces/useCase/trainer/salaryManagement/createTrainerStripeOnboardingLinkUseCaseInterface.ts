import {
  CreateTrainerOnboardingLinkDto,
  CreateTrainerOnboardingLinkResponseDto,
} from "../../../../dtos/trainerDto/trainerSalaryConfigDto";

export interface ICreateTrainerStripeOnboardingLinkUseCase {
  execute(
    data: CreateTrainerOnboardingLinkDto,
  ): Promise<CreateTrainerOnboardingLinkResponseDto>;
}
