import { WorkoutPlanEntity } from "../../../domain/entities/member/workoutPlanEntity";
import { HealthDetails } from "../../dtos/memberDto/workoutPlandto";

export interface IGeminiWorkoutService {
  generateWorkoutPlan(healthDetails: HealthDetails): Promise<WorkoutPlanEntity>;
}
