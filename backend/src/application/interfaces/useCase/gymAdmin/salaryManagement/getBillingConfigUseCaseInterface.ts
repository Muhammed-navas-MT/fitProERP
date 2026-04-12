import {
  BillingConfigResponseDto,
  GetBillingConfigDto,
} from "../../../../dtos/trainerDto/salaryDtos";

export interface IGetBillingConfigUseCase {
  execute(data: GetBillingConfigDto): Promise<BillingConfigResponseDto>;
}
