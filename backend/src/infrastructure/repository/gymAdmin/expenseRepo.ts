import { Model, Types, PipelineStage } from "mongoose";
import { IListExpenseRequestDto } from "../../../application/dtos/gymAdminDto/expenseDtos";
import { IGymAdminExpenseRepository } from "../../../application/interfaces/repository/gymAdmin/expenseRepoInterface";
import { BaseRepository } from "../base/baseRepo";
import { IGymAdminExpenseModel } from "../databaseConfigs/models/expenseModel";
import {
  IPopulatedExpense,
  MonthlyExpenseSummary,
} from "../databaseConfigs/types/populatedExpenseTypes";

export class GymAdminExpenseRepository
  extends BaseRepository<IGymAdminExpenseModel>
  implements IGymAdminExpenseRepository
{
  constructor(model: Model<IGymAdminExpenseModel>) {
    super(model);
  }

  async findAllExpense(params: IListExpenseRequestDto): Promise<{
    expense: IPopulatedExpense[];
    total: number;
    expenseSummary: MonthlyExpenseSummary[];
    thisMonthTotalExpense: number;
    grandTotal: number;
  }> {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const skip = (page - 1) * limit;

    const search = params.search || "";

    const now = new Date();
    const last12Months = new Date(now.getFullYear(), now.getMonth() - 11, 1);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const pipeline: PipelineStage[] = [
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
        $lookup: {
          from: "gymadmins",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdByUser",
        },
      },

      { $unwind: "$createdByUser" },

      ...(search
        ? [
            {
              $match: {
                $or: [
                  { expenseType: { $regex: search, $options: "i" } },
                  { "branch.branchName": { $regex: search, $options: "i" } },
                ],
              },
            },
          ]
        : []),

      {
        $facet: {
          data: [
            {
              $project: {
                id: { $toString: "$_id" },
                branch: {
                  branchName: "$branch.branchName",
                  city: "$branch.address.city",
                  pincode: "$branch.address.pincode",
                },
                expenseType: 1,
                description: 1,
                createdBy: {
                  name: "$createdByUser.name",
                  email: "$createdByUser.email",
                  model: "$createdByModel",
                },
                amount: 1,
                paymentMethod: 1,
                paymentDate: 1,
                status: 1,
                createdAt: 1,
              },
            },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],

          totalCount: [{ $count: "count" }],

          summary: [
            {
              $match: {
                paymentDate: { $gte: last12Months },
              },
            },

            {
              $group: {
                _id: {
                  year: { $year: "$paymentDate" },
                  month: { $month: "$paymentDate" },
                },

                Rent: {
                  $sum: {
                    $cond: [{ $eq: ["$expenseType", "Rent"] }, "$amount", 0],
                  },
                },

                Utilities: {
                  $sum: {
                    $cond: [
                      { $eq: ["$expenseType", "Utilities"] },
                      "$amount",
                      0,
                    ],
                  },
                },

                Maintenance: {
                  $sum: {
                    $cond: [
                      { $eq: ["$expenseType", "Maintenance"] },
                      "$amount",
                      0,
                    ],
                  },
                },

                Equipment: {
                  $sum: {
                    $cond: [
                      { $eq: ["$expenseType", "Equipment"] },
                      "$amount",
                      0,
                    ],
                  },
                },

                Marketing: {
                  $sum: {
                    $cond: [
                      { $eq: ["$expenseType", "Marketing"] },
                      "$amount",
                      0,
                    ],
                  },
                },

                TrainerCommission: {
                  $sum: {
                    $cond: [
                      { $eq: ["$expenseType", "TrainerCommission"] },
                      "$amount",
                      0,
                    ],
                  },
                },

                Other: {
                  $sum: {
                    $cond: [{ $eq: ["$expenseType", "Other"] }, "$amount", 0],
                  },
                },
              },
            },

            {
              $project: {
                _id: 0,
                month: {
                  $dateToString: {
                    format: "%B %Y",
                    date: {
                      $dateFromParts: {
                        year: "$_id.year",
                        month: "$_id.month",
                        day: 1,
                      },
                    },
                  },
                },
                Rent: 1,
                Utilities: 1,
                Maintenance: 1,
                Equipment: 1,
                Marketing: 1,
                TrainerCommission: 1,
                Other: 1,
              },
            },

            { $sort: { month: 1 } },
          ],

          thisMonthTotal: [
            {
              $match: {
                paymentDate: { $gte: startOfMonth },
              },
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$amount" },
              },
            },
          ],

          grandTotal: [
            {
              $group: {
                _id: null,
                total: { $sum: "$amount" },
              },
            },
          ],
        },
      },
    ];

    const result = await this._model.aggregate(pipeline);

    const expenses: IPopulatedExpense[] = result[0]?.data || [];
    const total: number = result[0]?.totalCount[0]?.count || 0;
    const expenseSummary: MonthlyExpenseSummary[] = result[0]?.summary || [];

    const thisMonthTotalExpense = result[0]?.thisMonthTotal?.[0]?.total || 0;

    const grandTotal = result[0]?.grandTotal?.[0]?.total || 0;

    return {
      expense: expenses,
      total,
      expenseSummary,
      thisMonthTotalExpense,
      grandTotal,
    };
  }

  async findExpenseDetailById(id: string): Promise<IPopulatedExpense | null> {
    const pipeline: PipelineStage[] = [
      {
        $match: {
          _id: new Types.ObjectId(id),
        },
      },

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
        $lookup: {
          from: "gymadmins",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdByUser",
        },
      },

      { $unwind: "$createdByUser" },

      {
        $project: {
          id: { $toString: "$_id" },

          branch: {
            branchName: "$branch.branchName",
            city: "$branch.address.city",
            pincode: "$branch.address.pincode",
          },

          expenseType: 1,
          description: 1,

          createdBy: {
            name: "$createdByUser.name",
            email: "$createdByUser.email",
            model: "$createdByModel",
          },

          amount: 1,
          paymentMethod: 1,
          paymentDate: 1,
          status: 1,
          createdAt: 1,
        },
      },
    ];

    const result = await this._model.aggregate<IPopulatedExpense>(pipeline);

    return result.length ? result[0] : null;
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
          gymId,
          branchId,
          paymentDate: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          totalExpense: { $sum: "$amount" },
        },
      },
    ]);

    return result.length ? result[0].totalExpense : 0;
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
      paymentDate: { $gte: startDate, $lte: endDate },
    });

    return count;
  }
}
