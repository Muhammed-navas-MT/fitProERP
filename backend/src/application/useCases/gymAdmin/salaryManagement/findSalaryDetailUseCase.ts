import { NOtFoundException } from "../../../constants/exceptions";
import { FindDetailSalaryResponseDto } from "../../../dtos/trainerDto/salaryDtos";
import { ITrainerSalaryRepository } from "../../../interfaces/repository/trainer.ts/trainerSalaryRepoInterface";
import { IFindSalaryDetailUseCase } from "../../../interfaces/useCase/gymAdmin/salaryManagement/findSalaryDetailUseCaseInterface";
import { TrainerSalaryMapper } from "../../../mappers/trainer/trainerSalaryMapper";

export class FindSalaryDetailUseCase implements IFindSalaryDetailUseCase {
  constructor(private _salaryRepository: ITrainerSalaryRepository) {}
  async execute(salaryId: string): Promise<FindDetailSalaryResponseDto> {
    const salaryDetails = await this._salaryRepository.findDetailById(salaryId);
    if (!salaryDetails) {
      throw new NOtFoundException("Salary not fund exeption");
    }
    const response = TrainerSalaryMapper.toSalaryDetailResponse(salaryDetails);
    return response;
  }
}
