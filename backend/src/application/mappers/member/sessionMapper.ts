import { PopulateSessionItem } from "../../../infrastructure/repository/databaseConfigs/types/sessionPopulatedTypes";
import {
  ListAllSessionsRequestDto,
  ListAllSessionsResponseDto,
} from "../../dtos/memberDto/slotAndBookingDto";

export class SessionMapper {
  static toListSessionResponse(
    params: ListAllSessionsRequestDto,
    sessions: PopulateSessionItem[],
    total: number,
    countOfUpComingSession: number,
  ): ListAllSessionsResponseDto {
    return {
      limit: params.limit,
      page: params.page,
      total,
      totalPages: Math.ceil(total / params.limit),
      countOfUpComingSession,
      session: sessions.map((session) => {
        return {
          _id: session._id.toString(),
          date: session.date,
          endTime: session.endTime,
          startTime: session.startTime,
          status: session.status,
          trainerDetail: {
            name: session.trainerId.name,
          },
        };
      }),
    };
  }
}
