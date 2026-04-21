import { FindDetailSalaryResponseDto } from "../../../../dtos/trainerDto/salaryDtos";

export interface IFindSalaryDetailUseCase {
  execute(salaryId: string): Promise<FindDetailSalaryResponseDto>;
}
