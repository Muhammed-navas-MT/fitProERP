import { Model } from "mongoose";
import { BaseRepository } from "../base/baseRepo";
import { IAttendanceModel } from "../databaseConfigs/models/attendanceModel";
import { AttendanceEntity } from "../../../domain/entities/shared/attendanceEntity";
import { IAttendanceRepository } from "../../../application/interfaces/repository/shared/attendanceRepositoryInterface";

export class AttendanceRepository
  extends BaseRepository<IAttendanceModel>
  implements IAttendanceRepository
{
  constructor(model: Model<IAttendanceModel>) {
    super(model);
  }

  async findByUserAndDate(
    userId: string,
    date: Date
  ): Promise<AttendanceEntity | null> {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const attendance = await this._model.findOne({
      userId,
      date: { $gte: start, $lte: end },
    });

    return attendance ?attendance : null;
  };

  async findAll(params: {
    userId?: string;
    trainerId?: string;
    branchId?: string;
    startDate?: Date;
    endDate?: Date;
    page?: number;
    limit?: number;
  }): Promise<{ data: AttendanceEntity[]; total: number }> {
    const {
      userId,
      branchId,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = params;

    const query: any = {};

    if (userId) query.userId = userId;
    if (branchId) query.branchId = branchId;

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = startDate;
      if (endDate) query.date.$lte = endDate;
    }

    const skip = (page - 1) * limit;

    const [docs, total] = await Promise.all([
      this._model.find(query)
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit),
      this._model.countDocuments(query),
    ]);

    return {
      data: docs,
      total,
    };
  }
  
}
