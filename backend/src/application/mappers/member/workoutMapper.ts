import { WorkoutPlanEntity } from "../../../domain/entities/member/workoutPlanEntity";
import { listWorkoutPlanResponseDto } from "../../dtos/memberDto/workoutPlandto";

export class WorkoutMapper {
  static toListWorkoutResponse(
    workout: WorkoutPlanEntity,
  ): listWorkoutPlanResponseDto {
    return {
      days: workout.days,
      name: workout.name,
    };
  }
}
