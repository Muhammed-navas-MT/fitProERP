import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { DashboardDto } from "../../../dtos/memberDto/dashboardDto";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IProgressRepository } from "../../../interfaces/repository/member/progressRepoInterface";
import { IWorkoutPlanRepository } from "../../../interfaces/repository/member/workoutPlanRepoInterface";
import { IGetDashboardDetailUseCase } from "../../../interfaces/useCase/member/dashboardManagement/getDashboardDetailUseCaseInterface";
import { ProgressMapper } from "../../../mappers/member/progressMapper";
import { WorkoutMapper } from "../../../mappers/member/workoutMapper";
import { DashboardMapper } from "../../../mappers/member/dashboardMapper";

export class GetDashboardDetailUseCase implements IGetDashboardDetailUseCase {
  constructor(
    private _memberRepository: IMemberRepository,
    private _workoutRepository: IWorkoutPlanRepository,
    private _progressRepository: IProgressRepository,
  ) {}
  async execute(memberId: string): Promise<DashboardDto> {
    const [member, workoutPlan, progress] = await Promise.all([
      this._memberRepository.findById(memberId),
      this._workoutRepository.findWorkout(memberId),
      this._progressRepository.findProgressByMemberId(memberId),
    ]);
    if (!member) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }
    const today = new Date();
    const dayOfWeek = today.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const progressGraphData = ProgressMapper.toGraphData(progress);
    const workout = WorkoutMapper.toListOneDayWorkoutPlan(
      workoutPlan,
      dayOfWeek,
    );
    const start = member.package?.startDate;
    const end = member.package?.endDate;

    let daysTrained = 0;

    if (start && end) {
      const diffInMs = end.getTime() - start.getTime();
      daysTrained = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    }
    return DashboardMapper.toDashboardDto(
      progressGraphData,
      member,
      daysTrained,
      workout,
    );
  }
}
