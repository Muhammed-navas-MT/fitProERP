import { Model, Types } from "mongoose";
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

  async listTodaySessionsByTrainerId(
    trainerId: string,
    date: string,
  ): Promise<PopulateTrainerSessionItem[]> {
    const sessions = await this._model
      .find({ trainerId, date })
      .populate({
        path: "memberId",
        select: "name profileImg",
      })
      .lean<PopulateTrainerSessionItem[]>();
    return sessions;
  }

  async countSessionsByTrainerIdAndDate(
    trainerId: string,
    month: number,
    year: number,
  ): Promise<number> {
    const startDate = `${year}-${String(month).padStart(2, "0")}-01`;

    const nextMonth = month === 12 ? 1 : month + 1;
    const nextMonthYear = month === 12 ? year + 1 : year;

    const endDate = `${nextMonthYear}-${String(nextMonth).padStart(2, "0")}-01`;

    return await this._model.countDocuments({
      trainerId,
      status: SessionStatus.COMPLETED,
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });
  }

  async completedSessionsAmountByTrainerIdAndMonthYear(
    trainerId: string,
    salaryMonth: number,
    salaryYear: number,
  ): Promise<{ totalSessionsAmount: number; count: number }> {
    const startDate = `${salaryYear}-${String(salaryMonth).padStart(2, "0")}-01`;
    const nextMonth = salaryMonth === 12 ? 1 : salaryMonth + 1;
    const nextMonthYear = salaryMonth === 12 ? salaryYear + 1 : salaryYear;
    const endDate = `${nextMonthYear}-${String(nextMonth).padStart(2, "0")}-01`;

    const result = await this._model.aggregate([
      {
        $match: {
          trainerId: new Types.ObjectId(trainerId),
          status: SessionStatus.COMPLETED,
          date: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSessionsAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    return {
      totalSessionsAmount: result[0]?.totalSessionsAmount || 0,
      count: result[0]?.count || 0,
    };
  }
}
