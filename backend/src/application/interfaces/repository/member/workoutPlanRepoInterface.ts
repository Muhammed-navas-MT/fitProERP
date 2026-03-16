import { WorkoutPlanEntity } from "../../../../domain/entities/member/workoutPlanEntity";
import { IBaseRepository } from "../base/baseRepo";

export interface IWorkoutPlanRepository extends IBaseRepository<WorkoutPlanEntity> {
  findByMemberId(memberId: string): Promise<string>;
  findWorkout(memberId: string): Promise<WorkoutPlanEntity | null>;
}
