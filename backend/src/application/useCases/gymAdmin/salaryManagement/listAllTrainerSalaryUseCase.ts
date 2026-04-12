import {
  ListTrainerSalaryRequestDto,
  ListTrainerSalaryResponseDto,
} from "../../../dtos/trainerDto/salaryDtos";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ITrainerSalaryRepository } from "../../../interfaces/repository/trainer.ts/trainerSalaryRepoInterface";
import { IListAllSalariesUseCase } from "../../../interfaces/useCase/gymAdmin/salaryManagement/listAllTrainerSalaryUseCaseInterface";
import { TrainerSalaryMapper } from "../../../mappers/trainer/trainerSalaryMapper";

export class ListAllTrainerSalaryUseCase implements IListAllSalariesUseCase {
  constructor(
    private _salaryRepository: ITrainerSalaryRepository,
    private _gymAdminRepository: IGymAdminRepository,
  ) {}

  async execute(
    params: ListTrainerSalaryRequestDto,
  ): Promise<ListTrainerSalaryResponseDto> {
    const { gymId, limit, page } = params;

    const { salaries, total } =
      await this._salaryRepository.findAllSalariesByGymId(params);

    const today = new Date();
    let salaryMonth = today.getMonth();
    let salaryYear = today.getFullYear();

    if (salaryMonth === 0) {
      salaryMonth = 12;
      salaryYear -= 1;
    }

    const [isGenerated, isBillingConfigAdded] = await Promise.all([
      this._salaryRepository.isSalaryGeneratedByGymAndMonthYear(
        gymId,
        salaryMonth,
        salaryYear,
      ),
      this._gymAdminRepository.isBillingConfigAdded(gymId),
    ]);

    return {
      total,
      limit,
      page,
      totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
      isGenerated,
      isBillingConfigAdded,
      salaries: salaries.map((salary) =>
        TrainerSalaryMapper.toResponseDto(salary),
      ),
    };
  }
}
