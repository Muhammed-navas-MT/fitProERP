import { Model } from "mongoose";
import { BaseRepository } from "../base/baseRepo";
import { ISuperAdminPaymentModel } from "../databaseConfigs/models/superAdminPaymentModel";
import { ISuperAdminPaymentRepository } from "../../../application/interfaces/repository/superAdmin/paymentRepoInterface";
import { IListPaymentRequestDTO } from "../../../application/dtos/superAdminDto/paymentDto";
import { IPopulatedPayment } from "../databaseConfigs/types/populatedPaymentType";
import {
  PlanDistributionType,
  RevenueOverviewDto,
} from "../../../application/dtos/superAdminDto/dashboardDto";
import { PaymentStatus } from "../../../domain/enums/paymentStatus";

export class SuperAdminPaymentRepository
  extends BaseRepository<ISuperAdminPaymentModel>
  implements ISuperAdminPaymentRepository
{
  constructor(model: Model<ISuperAdminPaymentModel>) {
    super(model);
  }
  async existsBySessionId(sessionId: string): Promise<boolean> {
    return !!(await this._model.findOne({ stripeSessionId: sessionId }));
  }

  async findAllPayments(
    params: IListPaymentRequestDTO,
  ): Promise<{ payments: IPopulatedPayment[]; total: number }> {
    const { search, page, limit } = params;
    const skip = (page - 1) * limit;
    const matchStage = search
      ? {
          $match: {
            $or: [
              { "package.planName": { $regex: search, $options: "i" } },
              { "gym.gymName": { $regex: search, $options: "i" } },
            ],
          },
        }
      : { $match: {} };

    const result = await this._model.aggregate([
      {
        $lookup: {
          from: "gymadmins",
          localField: "gymId",
          foreignField: "_id",
          as: "gym",
        },
      },
      { $unwind: "$gym" },

      {
        $lookup: {
          from: "subscriptions",
          localField: "packageId",
          foreignField: "_id",
          as: "package",
        },
      },
      { $unwind: "$package" },

      matchStage,

      {
        $facet: {
          payments: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],
          totalCount: [{ $count: "total" }],
        },
      },
    ]);

    const payments = result[0].payments;
    const total = result[0].totalCount[0]?.total || 0;

    return { payments, total };
  }
  async getCurrentMonthRevenue(start: Date, end: Date): Promise<number> {
    const result = await this._model.aggregate([
      {
        $match: {
          status: "PAID",
          createdAt: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    return result[0]?.total || 0;
  }

  async getLastMonthRevenue(start: Date, end: Date): Promise<number> {
    const result = await this._model.aggregate([
      {
        $match: {
          status: "PAID",
          createdAt: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    return result[0]?.total || 0;
  }

  async getRevenueOverviewByMonth(
    months: number = 6,
  ): Promise<RevenueOverviewDto[]> {
    const startDate = this.getMonthsAgoStart(months);

    const result = await this._model.aggregate([
      {
        $match: {
          status: "PAID",
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    const revenueMap = new Map<string, number>();

    result.forEach((item) => {
      revenueMap.set(`${item._id.year}-${item._id.month}`, item.total);
    });

    const output: RevenueOverviewDto[] = [];
    const now = new Date();

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = date.getFullYear();
      const monthNumber = date.getMonth() + 1;
      const month = date.toLocaleString("en-US", { month: "short" });

      output.push({
        month,
        revenue: revenueMap.get(`${year}-${monthNumber}`) || 0,
      });
    }

    return output;
  }
  async getPlanDistribution(): Promise<PlanDistributionType[]> {
    const result = await this._model.aggregate([
      {
        $match: {
          status: PaymentStatus.PAID,
        },
      },
      {
        $lookup: {
          from: "subscriptions",
          localField: "packageId",
          foreignField: "_id",
          as: "subscription",
        },
      },
      {
        $unwind: "$subscription",
      },
      {
        $group: {
          _id: "$packageId",
          planName: { $first: "$subscription.planName" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          planName: 1,
          count: 1,
        },
      },
    ]);

    return result;
  }
  private getMonthsAgoStart(months: number): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);
  }
}
