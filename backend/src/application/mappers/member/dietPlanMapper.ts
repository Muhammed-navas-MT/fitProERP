import { DietPlanEntity } from "../../../domain/entities/member/dietEntity";
import { listDietPlanResponseDto } from "../../dtos/memberDto/dietPlanDto";

export class DietPlanMapper {
  static toDietPlanListResponseDto(
    diet: DietPlanEntity,
  ): listDietPlanResponseDto {
    return {
      days: diet.days,
      planName: diet.planName,
      goalType: diet.goalType,
    };
  }
}
