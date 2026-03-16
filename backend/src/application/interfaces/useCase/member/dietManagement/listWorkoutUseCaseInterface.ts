import { listDietPlanResponseDto } from "../../../../dtos/memberDto/dietPlanDto";

export interface IListDietPlanUseCase {
  execute(memberId: string): Promise<listDietPlanResponseDto | null>;
}
