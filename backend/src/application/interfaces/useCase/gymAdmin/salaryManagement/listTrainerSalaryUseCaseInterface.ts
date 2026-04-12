import { TrainerSalaryResponseDto } from "../../../../dtos/trainerDto/salaryDtos";

export interface IListTrainerSalaryUseCase {
  execute(
    trainerId: string,
    page: number,
    limit: number,
  ): Promise<{
    data: TrainerSalaryResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
}
