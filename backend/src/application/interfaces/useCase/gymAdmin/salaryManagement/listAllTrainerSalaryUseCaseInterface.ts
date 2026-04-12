import {
  ListTrainerSalaryRequestDto,
  ListTrainerSalaryResponseDto,
} from "../../../../dtos/trainerDto/salaryDtos";

export interface IListAllSalariesUseCase {
  execute(
    params: ListTrainerSalaryRequestDto,
  ): Promise<ListTrainerSalaryResponseDto>;
}
