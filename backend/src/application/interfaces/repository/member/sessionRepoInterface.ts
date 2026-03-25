import { SessionEntity } from "../../../../domain/entities/member/sessionEntity";
import {
  PopulateSessionItem,
  PopulateTrainerSessionItem,
} from "../../../../infrastructure/repository/databaseConfigs/types/sessionPopulatedTypes";
import { ListAllSessionsRequestDto } from "../../../dtos/memberDto/slotAndBookingDto";
import { ListSessionRequestDto } from "../../../dtos/trainerDto/sessionDto";
import { IBaseRepository } from "../base/baseRepo";

export interface ISessionRepository extends IBaseRepository<SessionEntity> {
  findByTrainerIdAndDates(
    trainerId: string,
    dates: string[],
  ): Promise<SessionEntity[]>;
  findOneBySlotAndDate(
    trainerId: string,
    slotId: string,
    sessionDate: Date,
  ): Promise<SessionEntity | null>;
  listAllSessionByMemberId(
    params: ListAllSessionsRequestDto,
  ): Promise<{ sessions: PopulateSessionItem[]; total: number }>;
  listAllSessionByTrainerId(
    params: ListSessionRequestDto,
  ): Promise<{ sessions: PopulateTrainerSessionItem[]; total: number }>;
}
