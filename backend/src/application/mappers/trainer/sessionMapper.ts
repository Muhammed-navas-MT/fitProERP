import { PopulateTrainerSessionItem } from "../../../infrastructure/repository/databaseConfigs/types/sessionPopulatedTypes";
import {
  ListSessionRequestDto,
  ListSessionResponseDto,
} from "../../dtos/trainerDto/sessionDto";

export class TrainerSessionMapper {
  static toListSessionResponse(
    params: ListSessionRequestDto,
    sessions: PopulateTrainerSessionItem[],
    total: number,
  ): ListSessionResponseDto {
    return {
      limit: params.limit,
      page: params.page,
      total,
      totalPages: Math.ceil(total / params.limit),
      sessions: sessions.map((session) => {
        return {
          id: session._id.toString(),
          date: session.date,
          endTime: session.endTime,
          startTime: session.startTime,
          status: session.status,
          memberDetail: {
            name: session.memberId.name,
            profileImg: session.memberId.profileImg,
          },
        };
      }),
    };
  }
}
