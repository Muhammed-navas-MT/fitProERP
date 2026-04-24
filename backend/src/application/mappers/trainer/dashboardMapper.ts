import { PopulateTrainerSessionItem } from "../../../infrastructure/repository/databaseConfigs/types/sessionPopulatedTypes";
import { DashboardSummaryDto } from "../../dtos/trainerDto/dashboardDto";

export class DashboardMapper {
  static toDashBoardSummary(
    sessions: PopulateTrainerSessionItem[],
    completedSessionCount: number,
    activeMembers: number,
    totalMembers: number,
    salary: number,
  ): DashboardSummaryDto {
    return {
      clients: {
        assigned: totalMembers,
        active: activeMembers,
      },
      earnings: {
        monthly: salary,
      },
      sessions: {
        completed: completedSessionCount,
        total: sessions.length,
      },
      upcomingSessions: sessions.map((session) => {
        return {
          date: session.date,
          endTime: session.endTime,
          id: session._id.toString() as string,
          memberName: session.memberId.name,
          startTime: session.startTime,
          profileImg: session.memberId.profileImg,
        };
      }),
    };
  }
}
