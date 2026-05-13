import { FilterQuery, Model, PipelineStage, Types } from "mongoose";
import { ILeaveRepository } from "../../../application/interfaces/repository/shared/leaveRepoInterface";
import { ITrainerLeaveEntity } from "../../../domain/entities/gymAdmin/TrainerLeaveEntity";
import { BaseRepository } from "../base/baseRepo";
import { ITrainerLeaveModel } from "../databaseConfigs/models/trainerLeaveModel";
import {
  ListLeavesRequestDto,
  ListTrainersLeavesRequestDto,
} from "../../../application/dtos/shared/leaveDto";
import {
  PopulateListTrainerLeaves,
  PopulateTrainerLeave,
} from "../databaseConfigs/types/populateLeaveType";
import { LeaveStatus } from "../../../domain/enums/leaveStatus";

export class LeaveRepository
  extends BaseRepository<ITrainerLeaveModel>
  implements ILeaveRepository
{
  constructor(model: Model<ITrainerLeaveModel>) {
    super(model);
  }

  async findOverlappingLeave(
    trainerId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<ITrainerLeaveEntity[]> {
    const leaves = await this._model.find({
      trainerId,
      startDate: { $lte: endDate },
      endDate: { $gte: startDate },
    });

    return leaves;
  }

  async findAllLeavesByTrainerId(
    params: ListLeavesRequestDto,
    trainerId: string,
  ): Promise<{ leaves: ITrainerLeaveEntity[]; total: number }> {
    const { search, limit, page, status } = params;

    const filter: FilterQuery<ITrainerLeaveModel> = {
      trainerId,
    };

    if (status) {
      filter.status = status;
    }

    if (search && search.trim() !== "") {
      filter.reason = {
        $regex: search,
        $options: "i",
      };
    }

    const leaves = await this._model
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await this._model.countDocuments(filter);

    return { leaves: leaves.map((leave) => leave.toObject()), total };
  }

  async findAllLeavesByGymId(
    params: ListTrainersLeavesRequestDto,
    gymId: string,
  ): Promise<{ leaves: PopulateListTrainerLeaves[]; total: number }> {
    const { search, page, limit, status, branchId } = params;

    const matchStage: PipelineStage.Match["$match"] = {
      "branchDetail.gymId": new Types.ObjectId(gymId),
    };

    if (status) {
      matchStage.status = status;
    }

    if (branchId) {
      matchStage["branchDetail._id"] = new Types.ObjectId(branchId);
    }

    const aggregation: PipelineStage[] = [
      {
        $lookup: {
          from: "trainers",
          localField: "trainerId",
          foreignField: "_id",
          as: "trainerDetail",
        },
      },

      { $unwind: "$trainerDetail" },

      {
        $lookup: {
          from: "branches",
          localField: "trainerDetail.branchId",
          foreignField: "_id",
          as: "branchDetail",
        },
      },

      { $unwind: "$branchDetail" },

      {
        $match: matchStage,
      },
    ];

    if (search && search.trim() !== "") {
      aggregation.push({
        $match: {
          $or: [
            { reason: { $regex: search, $options: "i" } },
            { "trainerDetail.name": { $regex: search, $options: "i" } },
          ],
        },
      });
    }

    const totalResult = await this._model.aggregate([
      ...aggregation,
      { $count: "total" },
    ]);

    const total = totalResult[0]?.total || 0;

    aggregation.push(
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },

      {
        $project: {
          _id: 1,
          startDate: 1,
          endDate: 1,
          leaveCount: 1,
          status: 1,
          reason: 1,
          appliedDate: "$createdAt",

          trainerDetail: {
            _id: "$trainerDetail._id",
            name: "$trainerDetail.name",
            email: "$trainerDetail.email",
            branchId: "$trainerDetail.branchId",
          },

          branchDetail: {
            branchName: "$branchDetail.branchName",
            address: {
              city: "$branchDetail.address.city",
              pincode: "$branchDetail.address.pincode",
            },
          },
        },
      },
    );

    const leaves =
      await this._model.aggregate<PopulateListTrainerLeaves>(aggregation);

    return { leaves, total };
  }

  async findTrainerLeaveDetail(leaveId: string): Promise<PopulateTrainerLeave> {
    const result = await this._model.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(leaveId),
        },
      },

      {
        $lookup: {
          from: "trainers",
          localField: "trainerId",
          foreignField: "_id",
          as: "trainerDetail",
        },
      },

      { $unwind: "$trainerDetail" },

      {
        $lookup: {
          from: "branches",
          localField: "trainerDetail.branchId",
          foreignField: "_id",
          as: "branchDetail",
        },
      },

      { $unwind: "$branchDetail" },

      {
        $project: {
          _id: 1,
          startDate: 1,
          endDate: 1,
          leaveCount: 1,
          status: 1,
          reason: 1,
          rejectionReason: 1,
          appliedDate: "$createdAt",

          trainerDetail: {
            _id: "$trainerDetail._id",
            name: "$trainerDetail.name",
            email: "$trainerDetail.email",
            branchId: "$trainerDetail.branchId",
          },

          branchDetail: {
            branchName: "$branchDetail.branchName",
            address: {
              city: "$branchDetail.address.city",
              pincode: "$branchDetail.address.pincode",
            },
          },
        },
      },
    ]);

    if (!result.length) {
      throw new Error("Leave not found");
    }

    return result[0];
  }

  async findLeavesByTrainerIdAndDateRange(
    trainerId: string,
    rangeStart: Date,
    rangeEnd: Date,
  ): Promise<ITrainerLeaveEntity[]> {
    const leaves = await this._model
      .find({
        trainerId,
        startDate: { $lte: rangeEnd },
        endDate: { $gte: rangeStart },
        status: { $ne: LeaveStatus.REJECTED },
      })
      .lean();

    return leaves;
  }
}
