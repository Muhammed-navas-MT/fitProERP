import { ListSalaryResponseDto } from "../../../../dtos/trainerDto/trainerSalaryConfigDto";

export interface IListAllSalaryUseCase {
  execute(
    trainerId: string,
    page: number,
    limit: number,
  ): Promise<{
    data: ListSalaryResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
}
