import { WorkoutPlanEntity } from "../../../domain/entities/member/workoutPlanEntity";
import { DayWorkout } from "../../dtos/memberDto/dashboardDto";
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
  static toListOneDayWorkoutPlan(
    workout: WorkoutPlanEntity | null,
    dayOfWeek: string,
  ): DayWorkout | null {
    if (!workout) return null;
    return (
      workout.days.find(
        (val) => val.dayOfWeek.toLowerCase() === dayOfWeek.toLowerCase(),
      ) || null
    );
  }
}
