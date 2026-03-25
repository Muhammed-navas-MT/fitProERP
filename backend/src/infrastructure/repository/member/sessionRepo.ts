import { Model } from "mongoose";
import { ISessionRepository } from "../../../application/interfaces/repository/member/sessionRepoInterface";
import { BaseRepository } from "../base/baseRepo";
import { ISessionModel } from "../databaseConfigs/models/sessionModel";
import { SessionEntity } from "../../../domain/entities/member/sessionEntity";
import { SessionStatus } from "../../../domain/enums/sessionStatus";
import { ListAllSessionsRequestDto } from "../../../application/dtos/memberDto/slotAndBookingDto";
import {
  PopulateSessionItem,
  PopulateTrainerSessionItem,
} from "../databaseConfigs/types/sessionPopulatedTypes";
import { ListSessionRequestDto } from "../../../application/dtos/trainerDto/sessionDto";

export class SessionRepository
  extends BaseRepository<ISessionModel>
  implements ISessionRepository
{
  constructor(model: Model<ISessionModel>) {
    super(model);
  }

  async findByTrainerIdAndDates(
    trainerId: string,
    dates: string[],
  ): Promise<SessionEntity[]> {
    const sessions = await this._model
      .find({
        trainerId,
        date: { $in: dates },
      })
      .lean();

    return sessions as SessionEntity[];
  }

  async findOneBySlotAndDate(
    trainerId: string,
    slotId: string,
    sessionDate: Date,
  ): Promise<SessionEntity | null> {
    const date = sessionDate.toISOString().split("T")[0];

    const session = await this._model
      .findOne({
        trainerId,
        slotId,
        date,
        status: { $ne: SessionStatus.CANCELLED },
      })
      .lean();

    return session as SessionEntity | null;
  }

  async listAllSessionByMemberId(
    params: ListAllSessionsRequestDto,
  ): Promise<{ sessions: PopulateSessionItem[]; total: number }> {
    const { memberId, page, limit } = params;
    const skip = (page - 1) * limit;
    const total = await this._model.countDocuments({
      memberId,
    });

    const sessions = await this._model
      .find({ memberId })
      .populate({
        path: "trainerId",
        select: "name",
      })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .lean<PopulateSessionItem[]>();

    return {
      sessions,
      total,
    };
  }

  async listAllSessionByTrainerId(
    params: ListSessionRequestDto,
  ): Promise<{ sessions: PopulateTrainerSessionItem[]; total: number }> {
    const { trainerId, page, limit } = params;
    const skip = (page - 1) * limit;
    const total = await this._model.countDocuments({
      trainerId,
    });

    const sessions = await this._model
      .find({ trainerId })
      .populate({
        path: "memberId",
        select: "name profileImg",
      })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .lean<PopulateTrainerSessionItem[]>();

    return {
      sessions,
      total,
    };
  }
}
