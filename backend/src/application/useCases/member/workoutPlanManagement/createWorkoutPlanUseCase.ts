import { WorkoutPlanEntity } from "../../../../domain/entities/member/workoutPlanEntity";
import { generateWorkout } from "../../../../infrastructure/services/workoutPlan";
import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IWorkoutPlanRepository } from "../../../interfaces/repository/member/workoutPlanRepoInterface";
import { ICreateWorkoutPlanUseCase } from "../../../interfaces/useCase/member/workoutPlanManagement/createWorkoutPlanUseCaseInterface";

export class CreateWorkoutPlanUseCase implements ICreateWorkoutPlanUseCase {
  constructor(
    private _workoutPlanRepository: IWorkoutPlanRepository,
    private _memberRepository: IMemberRepository,
  ) {}
  async execute(userId: string): Promise<void> {
    const member = await this._memberRepository.findById(userId);
    if (!member) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }

    const workout = await generateWorkout(member.healthDetails);

    const existWorkoutId =
      await this._workoutPlanRepository.findByMemberId(userId);

    if (existWorkoutId) {
      await this._workoutPlanRepository.update(
        { days: workout.days },
        existWorkoutId,
      );
    } else {
      const workoutPlan: WorkoutPlanEntity = {
        memberId: userId,
        name: workout.name,
        createdAt: new Date(),
        days: workout.days,
      };
      await this._workoutPlanRepository.create(workoutPlan);
    }
  }
}
