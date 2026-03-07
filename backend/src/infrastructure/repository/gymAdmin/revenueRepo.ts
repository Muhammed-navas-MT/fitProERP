import { FilterQuery, Model, Types, PipelineStage } from "mongoose";
import { BaseRepository } from "../base/baseRepo";
import { IGymAdminRevenueModel } from "../databaseConfigs/models/revenueModel";
import { IGymAdminRevenueRepository } from "../../../application/interfaces/repository/gymAdmin/revenueRepoInterface";
import { IListRevenueRequestDTO } from "../../../application/dtos/gymAdminDto/revenueDto";
import {
  IPopulatedRevenue,
  SummaryType,
} from "../databaseConfigs/types/populatedRevenueType";

export class GymAdminRevenueRepository
  extends BaseRepository<IGymAdminRevenueModel>
  implements IGymAdminRevenueRepository
{
  constructor(model: Model<IGymAdminRevenueModel>) {
    super(model);
  }

  async existsBySessionId(sessionId: string): Promise<boolean> {
    return !!(await this._model.findOne({ stripeSessionId: sessionId }));
  }

  async findAllRevenues(params: IListRevenueRequestDTO): Promise<{
    revenues: IPopulatedRevenue[];
    total: number;
    summary: SummaryType[];
    grandTotalAmount: number;
  }> {
    const { search, page, limit, gymId, branchId, sourceType } = params;

    const skip = (page - 1) * limit;

    const baseMatch: FilterQuery<IGymAdminRevenueModel> = {
      gymId: new Types.ObjectId(gymId),
    };

    if (branchId) {
      baseMatch.branchId = new Types.ObjectId(branchId);
    }

    if (sourceType) {
      baseMatch.sourceType = sourceType;
    }

    const pipeline: PipelineStage[] = [
      { $match: baseMatch },

      {
        $lookup: {
          from: "members",
          localField: "userId",
          foreignField: "_id",
          as: "member",
        },
      },
      { $unwind: "$member" },

      {
        $lookup: {
          from: "branches",
          localField: "branchId",
          foreignField: "_id",
          as: "branch",
        },
      },
      { $unwind: "$branch" },
    ];

    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { "member.name": { $regex: search, $options: "i" } },
            { "branch.branchName": { $regex: search, $options: "i" } },
            { source: { $regex: search, $options: "i" } },
          ],
        },
      });
    }

    pipeline.push({
      $facet: {
        revenues: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
          {
            $project: {
              _id: 1,
              amount: 1,
              source: 1,
              sourceType: 1,
              paymentMethod: 1,
              status: 1,
              createdAt: 1,
              member: {
                name: "$member.name",
                email: "$member.email",
              },
              branch: {
                branchName: "$branch.branchName",
                address: {
                  city: "$branch.address.city",
                  pincode: "$branch.address.pincode",
                },
              },
            },
          },
        ],

        totalCount: [{ $count: "total" }],

        summaryBySource: [
          {
            $group: {
              _id: "$sourceType",
              totalAmount: { $sum: "$amount" },
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              sourceType: "$_id",
              totalAmount: 1,
              count: 1,
            },
          },
        ],

        grandTotal: [
          {
            $group: {
              _id: null,
              totalAmount: { $sum: "$amount" },
            },
          },
          {
            $project: {
              _id: 0,
              totalAmount: 1,
            },
          },
        ],
      },
    });

    const result = await this._model.aggregate<{
      revenues: IPopulatedRevenue[];
      totalCount: { total: number }[];
      summaryBySource: {
        sourceType: string;
        totalAmount: number;
        count: number;
      }[];
      grandTotal: { totalAmount: number }[];
    }>(pipeline);

    const revenues = result[0]?.revenues ?? [];
    const total = result[0]?.totalCount?.[0]?.total ?? 0;
    const summary = result[0]?.summaryBySource ?? [];
    const grandTotalAmount = result[0]?.grandTotal?.[0]?.totalAmount ?? 0;

    return {
      revenues,
      total,
      summary,
      grandTotalAmount,
    };
  }

  async findRevenueDetailById(id: string): Promise<IPopulatedRevenue | null> {
    const pipeline: PipelineStage[] = [
      {
        $match: {
          _id: new Types.ObjectId(id),
        },
      },

      {
        $lookup: {
          from: "members",
          localField: "userId",
          foreignField: "_id",
          as: "member",
        },
      },
      { $unwind: "$member" },

      {
        $lookup: {
          from: "branches",
          localField: "branchId",
          foreignField: "_id",
          as: "branch",
        },
      },
      { $unwind: "$branch" },

      {
        $project: {
          _id: 1,
          amount: 1,
          source: 1,
          paymentMethod: 1,
          status: 1,
          createdAt: 1,

          member: {
            name: "$member.name",
            email: "$member.email",
          },

          branch: {
            branchName: "$branch.branchName",
            address: {
              city: "$branch.address.city",
              pincode: "$branch.address.pincode",
            },
          },
        },
      },
    ];

    const result = await this._model.aggregate<IPopulatedRevenue>(pipeline);
    return result[0] ?? null;
  }
}
