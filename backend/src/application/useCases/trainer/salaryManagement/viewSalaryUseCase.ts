import { viewDetailSalaryResponseDto } from "../../../dtos/trainerDto/trainerSalaryConfigDto";
import { ITrainerSalaryRepository } from "../../../interfaces/repository/trainer.ts/trainerSalaryRepoInterface";
import { IViewSalaryUseCase } from "../../../interfaces/useCase/trainer/salaryManagement/viewSalaryUseCaseInterface";
import { TrainerSalaryMapper } from "../../../mappers/trainer/trainerSalaryMapper";
import { NOtFoundException } from "../../../constants/exceptions";

export class ViewSalaryUseCase implements IViewSalaryUseCase {
  constructor(private _salaryRepository: ITrainerSalaryRepository) {}
  async execute(salaryId: string): Promise<viewDetailSalaryResponseDto> {
    const salary = await this._salaryRepository.findDetailById(salaryId);
    if (!salary) {
      throw new NOtFoundException("Salary not found");
    }
    const response = TrainerSalaryMapper.toTrainerSalaryDetailResponse(salary);
    return response;
  }
}
