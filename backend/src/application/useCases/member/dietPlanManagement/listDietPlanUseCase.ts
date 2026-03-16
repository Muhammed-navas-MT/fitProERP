import { listDietPlanResponseDto } from "../../../dtos/memberDto/dietPlanDto";
import { IDietPlanRepository } from "../../../interfaces/repository/member/dietPlanRepoInterface";
import { IListDietPlanUseCase } from "../../../interfaces/useCase/member/dietManagement/listWorkoutUseCaseInterface";
import { DietPlanMapper } from "../../../mappers/member/dietPlanMapper";

export class ListDietPlanUseCase implements IListDietPlanUseCase {
  constructor(private _dietPlanRepository: IDietPlanRepository) {}

  async execute(memberId: string): Promise<listDietPlanResponseDto | null> {
    const diet = await this._dietPlanRepository.findDiet(memberId);

    if (!diet) {
      return null;
    }

    const response = DietPlanMapper.toDietPlanListResponseDto(diet);
    return response;
  }
}
