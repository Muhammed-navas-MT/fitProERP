import { WorkoutPlanEntity } from "../../../../domain/entities/member/workoutPlanEntity";
import { NotificationType } from "../../../../domain/enums/notificationTypes";
import { Roles } from "../../../../domain/enums/roles";
import { generateWorkout } from "../../../../infrastructure/services/workoutPlan";
import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IWorkoutPlanRepository } from "../../../interfaces/repository/member/workoutPlanRepoInterface";
import { INotificationService } from "../../../interfaces/service/notificationServiceInterface";
import { ICreateWorkoutPlanUseCase } from "../../../interfaces/useCase/member/workoutPlanManagement/createWorkoutPlanUseCaseInterface";

export class CreateWorkoutPlanUseCase implements ICreateWorkoutPlanUseCase {
  constructor(
    private _workoutPlanRepository: IWorkoutPlanRepository,
    private _memberRepository: IMemberRepository,
    private _notificationService: INotificationService,
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
      await this._notificationService.notify({
        receiverId: userId,
        receiverRole: Roles.MEMBER,
        title: "Workout Plan Ready 💪",
        message:
          "Your workout plan is ready. Stay consistent and crush your goals!",
        type: NotificationType.WORKOUT_PLAN_CREATED,
        relatedId: existWorkoutId,
        relatedModel: "WorkoutPlan",
        actionLink: "/member/workout_plans",
      });
    } else {
      const workoutPlan: WorkoutPlanEntity = {
        memberId: userId,
        name: workout.name,
        createdAt: new Date(),
        days: workout.days,
      };
      const workoutPlanId =
        await this._workoutPlanRepository.create(workoutPlan);
      await this._notificationService.notify({
        receiverId: userId,
        receiverRole: Roles.MEMBER,
        title: "Workout Plan Ready 💪",
        message:
          "Your workout plan is ready. Stay consistent and crush your goals!",
        type: NotificationType.WORKOUT_PLAN_CREATED,
        relatedId: workoutPlanId,
        relatedModel: "WorkoutPlan",
        actionLink: "/member/workout_plans",
      });
    }
  }
}
