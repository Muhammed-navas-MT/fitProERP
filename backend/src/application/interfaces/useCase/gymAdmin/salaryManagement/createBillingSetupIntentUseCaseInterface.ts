import {
  CreateSetupIntentDto,
  CreateSetupIntentResponseDto,
} from "../../../../dtos/trainerDto/salaryDtos";

export interface ICreateBillingSetupIntentUseCase {
  execute(data: CreateSetupIntentDto): Promise<CreateSetupIntentResponseDto>;
}
