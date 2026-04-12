import { TrainerSalaryResponseDto } from "../../../dtos/trainerDto/salaryDtos";
import { ITrainerSalaryRepository } from "../../../interfaces/repository/trainer.ts/trainerSalaryRepoInterface";
import { IListTrainerSalaryUseCase } from "../../../interfaces/useCase/gymAdmin/salaryManagement/listTrainerSalaryUseCaseInterface";
import { TrainerSalaryMapper } from "../../../mappers/trainer/trainerSalaryMapper";

export class ListTrainerSalaryUseCase implements IListTrainerSalaryUseCase {
  constructor(private _trainerSalaryRepository: ITrainerSalaryRepository) {}

  async execute(
    trainerId: string,
    page: number,
    limit: number,
  ): Promise<{
    data: TrainerSalaryResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const result = await this._trainerSalaryRepository.findAllByTrainerId(
      trainerId,
      page,
      limit,
    );

    return {
      ...result,
      data: result.data.map(TrainerSalaryMapper.toResponseDto),
    };
  }
}
