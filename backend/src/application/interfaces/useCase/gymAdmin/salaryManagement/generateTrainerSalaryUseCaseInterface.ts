import { CreateTrainerSalaryDto } from "../../../../dtos/trainerDto/salaryDtos";

export interface IGenerateTrainerSalaryUseCase {
  execute(data: CreateTrainerSalaryDto): Promise<void>;
}
