import { listWorkoutPlanResponseDto } from "../../../dtos/memberDto/workoutPlandto";
import { IWorkoutPlanRepository } from "../../../interfaces/repository/member/workoutPlanRepoInterface";
import { IListWorkoutPlanUseCase } from "../../../interfaces/useCase/member/workoutPlanManagement/listWorkoutPlanUseCaseInterface";
import { WorkoutMapper } from "../../../mappers/member/workoutMapper";

export class ListWorkoutPlanUseCase implements IListWorkoutPlanUseCase {
  constructor(private _workoutPlanRepository: IWorkoutPlanRepository) {}

  async execute(memberId: string): Promise<listWorkoutPlanResponseDto | null> {
    const workout = await this._workoutPlanRepository.findWorkout(memberId);

    if (!workout) {
      return null;
    }

    const response = WorkoutMapper.toListWorkoutResponse(workout);
    return response;
  }
}
