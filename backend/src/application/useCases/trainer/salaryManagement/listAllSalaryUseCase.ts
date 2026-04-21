import { ListSalaryResponseDto } from "../../../dtos/trainerDto/trainerSalaryConfigDto";
import { ITrainerSalaryRepository } from "../../../interfaces/repository/trainer.ts/trainerSalaryRepoInterface";
import { IListAllSalaryUseCase } from "../../../interfaces/useCase/trainer/salaryManagement/listAllSalaryUseCaseInterface";
import { TrainerSalaryMapper } from "../../../mappers/trainer/trainerSalaryMapper";

export class ListAllSalaryUseCase implements IListAllSalaryUseCase {
  constructor(private _salaryRepository: ITrainerSalaryRepository) {}
  async execute(
    trainerId: string,
    page: number,
    limit: number,
  ): Promise<{
    data: ListSalaryResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { data, total, totalPages } =
      await this._salaryRepository.findAllByTrainerId(trainerId, page, limit);
    const response = data.map((salary) =>
      TrainerSalaryMapper.toSalaryResponseDto(salary),
    );
    return {
      data: response,
      limit,
      page,
      total,
      totalPages,
    };
  }
}
