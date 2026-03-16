import { listWorkoutPlanResponseDto } from "../../../../dtos/memberDto/workoutPlandto";

export interface IListWorkoutPlanUseCase {
  execute(memberId: string): Promise<listWorkoutPlanResponseDto | null>;
}
