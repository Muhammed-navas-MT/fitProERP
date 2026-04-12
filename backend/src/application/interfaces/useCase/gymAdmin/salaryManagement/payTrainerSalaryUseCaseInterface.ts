import { PayTrainerSalaryDto } from "../../../../dtos/trainerDto/salaryDtos";

export interface IPayTrainerSalaryUseCase {
  execute(data: PayTrainerSalaryDto): Promise<void>;
}
