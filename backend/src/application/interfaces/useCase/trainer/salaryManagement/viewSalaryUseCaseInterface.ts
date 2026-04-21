import { viewDetailSalaryResponseDto } from "../../../../dtos/trainerDto/trainerSalaryConfigDto";

export interface IViewSalaryUseCase {
  execute(salaryId: string): Promise<viewDetailSalaryResponseDto>;
}
