import { FilterQuery, Model, Types, PipelineStage } from "mongoose";
import { BaseRepository } from "../base/baseRepo";
import { IGymAdminRevenueModel } from "../databaseConfigs/models/revenueModel";
import { IGymAdminRevenueRepository } from "../../../application/interfaces/repository/gymAdmin/revenueRepoInterface";
import { IListRevenueRequestDTO } from "../../../application/dtos/gymAdminDto/revenueDto";
import {
  IPopulatedPayment,
  IPopulatedRevenue,
  SummaryType,
} from "../databaseConfigs/types/populatedRevenueType";
import { IListPaymentsRequestDto } from "../../../application/dtos/memberDto/purchasePackageDto";
import { IGymAdminRevenueEntity } from "../../../domain/entities/gymAdmin/revenueEntity";
import { PaymentStatus } from "../../../domain/enums/paymentStatus";

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
              totalAmount: {
                $sum: {
                  $cond: [
                    { $ne: ["$status", PaymentStatus.REFUNDED] },
                    "$amount",
                    0,
                  ],
                },
              },
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
              totalAmount: {
                $sum: {
                  $cond: [
                    { $ne: ["$status", PaymentStatus.REFUNDED] },
                    "$amount",
                    0,
                  ],
                },
              },
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

  async findAllPaymentsByMemberId(params: IListPaymentsRequestDto): Promise<{
    payments: IPopulatedPayment[];
    total: number;
    grandTotalAmount: number;
    summary: SummaryType[];
  }> {
    const page = params.page;
    const limit = params.limit;
    const skip = (page - 1) * limit;

    const search = params.search;

    const match: FilterQuery<IGymAdminRevenueModel> = {
      userId: new Types.ObjectId(params.memberId),
    };

    if (params.sourceType) {
      match.sourceType = params.sourceType;
    }

    if (search) {
      match.source = { $regex: search, $options: "i" };
    }

    const pipeline: PipelineStage[] = [
      { $match: match },

      {
        $lookup: {
          from: "packages",
          localField: "sourceId",
          foreignField: "_id",
          as: "plan",
        },
      },

      {
        $lookup: {
          from: "bookings",
          localField: "sourceId",
          foreignField: "_id",
          as: "booking",
        },
      },

      { $unwind: { path: "$plan", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$booking", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "trainers",
          localField: "booking.trainerId",
          foreignField: "_id",
          as: "trainer",
        },
      },

      { $unwind: { path: "$trainer", preserveNullAndEmptyArrays: true } },

      {
        $addFields: {
          sourceDetails: {
            $cond: [
              { $eq: ["$sourceType", "Plan"] },
              {
                planName: "$plan.name",
                duration: "$plan.durationInDays",
              },
              {
                trainerName: "$trainer.name",
                sessionDate: "$booking.sessionDate",
              },
            ],
          },
        },
      },

      {
        $facet: {
          payments: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },

            {
              $project: {
                _id: 1,
                source: 1,
                sourceType: 1,
                sourceDetails: 1,
                amount: 1,
                paymentMethod: 1,
                status: 1,
                createdAt: 1,
              },
            },
          ],
          totalCount: [{ $count: "count" }],
          grandTotal: [
            {
              $group: {
                _id: null,
                total: {
                  $sum: {
                    $cond: [
                      { $ne: ["$status", PaymentStatus.REFUNDED] },
                      "$amount",
                      0,
                    ],
                  },
                },
              },
            },
          ],

          summary: [
            {
              $group: {
                _id: "$sourceType",
                totalAmount: {
                  $sum: {
                    $cond: [
                      { $ne: ["$status", PaymentStatus.REFUNDED] },
                      "$amount",
                      0,
                    ],
                  },
                },
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
        },
      },
    ];

    const result = await this._model.aggregate<{
      payments: IPopulatedPayment[];
      totalCount: { count: number }[];
      grandTotal: { total: number }[];
      summary: SummaryType[];
    }>(pipeline);

    const payments: IPopulatedPayment[] = result[0]?.payments || [];
    const total = result[0]?.totalCount?.[0]?.count || 0;
    const grandTotalAmount = result[0]?.grandTotal?.[0]?.total || 0;
    const summary: SummaryType[] = result[0]?.summary || [];

    return {
      payments,
      total,
      grandTotalAmount,
      summary,
    };
  }

  async calculateTotalByDate(
    gymId: string,
    branchId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<number> {
    const result = await this._model.aggregate([
      {
        $match: {
          gymId: new Types.ObjectId(gymId),
          branchId: new Types.ObjectId(branchId),
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: {
              $cond: [
                { $ne: ["$status", PaymentStatus.REFUNDED] },
                "$amount",
                0,
              ],
            },
          },
        },
      },
    ]);

    return result.length > 0 ? result[0].totalRevenue : 0;
  }

  async countByDate(
    gymId: string,
    branchId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<number> {
    const count = await this._model.countDocuments({
      gymId,
      branchId,
      createdAt: { $gte: startDate, $lte: endDate },
    });

    return count;
  }

  async totalRevenueByMonth(
    gymId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<number> {
    const result = await this._model.aggregate([
      {
        $match: {
          gymId: new Types.ObjectId(gymId),
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: {
              $cond: [
                { $ne: ["$status", PaymentStatus.REFUNDED] },
                "$amount",
                0,
              ],
            },
          },
        },
      },
    ]);

    return result[0]?.totalRevenue || 0;
  }

  async findBySessionId(
    sessionId: string,
  ): Promise<IGymAdminRevenueEntity | null> {
    const revenue = await this._model.findOne({ sourceId: sessionId }).lean();
    if (!revenue) {
      return null;
    }
    return revenue;
  }
}
