import {
  PayTrainerSalaryDto,
  PayTrainerSalaryResponseDto,
} from "../../../../dtos/trainerDto/salaryDtos";

export interface IPayTrainerSalaryUseCase {
  execute(data: PayTrainerSalaryDto): Promise<PayTrainerSalaryResponseDto>;
}
