import { MemberEntity } from "../../../domain/entities/member/memberEntity";
import {
  DashboardDto,
  DayWorkout,
  IMonthlyProgressReport,
} from "../../dtos/memberDto/dashboardDto";

export class DashboardMapper {
  static toDashboardDto(
    progress: IMonthlyProgressReport[],
    member: MemberEntity,
    daysTrained: number,
    workoutPlan: DayWorkout | null,
  ): DashboardDto {
    return {
      currentWeight: {
        value: member.healthDetails.weight.value,
        unit: member.healthDetails.weight.unit as "kg" | "lbs",
      },
      daysTrained,
      progressGraphData: progress,
      todayWorkout: workoutPlan,
    };
  }
}
