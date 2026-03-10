import { Model } from "mongoose";
import {
  BranchProfitabilityDTO,
  GymProfitAnalyticsDTO,
  IFindProfitRequestDto,
  InsightDTO,
  ProfitTrendDTO,
} from "../../../application/dtos/gymAdminDto/profitDto";
import { BaseRepository } from "../base/baseRepo";
import { IGymAdminProfitModel } from "../databaseConfigs/models/gymAdminProfitModel";
import { IGymAdminProfitEntity } from "../../../domain/entities/gymAdmin/profitEntiry";
import { IProfitRepository } from "../../../application/interfaces/repository/gymAdmin/profitRepoInterface";

export class ProfitRepository
  extends BaseRepository<IGymAdminProfitModel>
  implements IProfitRepository
{
  constructor(model: Model<IGymAdminProfitModel>) {
    super(model);
  }
  async findProfitByPeriod(
    params: IFindProfitRequestDto,
  ): Promise<IGymAdminProfitEntity | null> {
    return await this._model.findOne({
      gymId: params.gymId,
      branchId: params.branchId,
      periodStart: params.start,
      periodEnd: params.end,
    });
  }

  async getProfitAnalytics(
    gymId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<GymProfitAnalyticsDTO> {
    const profits = await this._model
      .find({
        gymId,
        periodStart: { $gte: startDate },
        periodEnd: { $lte: endDate },
      })
      .sort({ periodStart: 1 })
      .populate("branchId", "branchName");

    let totalRevenue = 0;
    let totalExpense = 0;
    let netProfit = 0;

    const monthMap: Record<string, ProfitTrendDTO> = {};
    const branchProfitability: BranchProfitabilityDTO[] = [];

    for (const p of profits) {
      totalRevenue += p.totalRevenue;
      totalExpense += p.totalExpense;
      netProfit += p.netProfit;

      const month = p.periodStart.toLocaleString("default", {
        month: "short",
      });

      if (!monthMap[month]) {
        monthMap[month] = {
          month,
          revenue: 0,
          expense: 0,
          profit: 0,
        };
      }

      monthMap[month].revenue += p.totalRevenue;
      monthMap[month].expense += p.totalExpense;
      monthMap[month].profit += p.netProfit;

      const margin =
        p.totalRevenue === 0 ? 0 : (p.netProfit / p.totalRevenue) * 100;

      const branch: any = p.branchId;

      branchProfitability.push({
        branchId: branch._id.toString(),
        branchName: branch.branchName,
        totalRevenue: p.totalRevenue,
        totalExpense: p.totalExpense,
        netProfit: p.netProfit,
        profitMargin: Number(margin.toFixed(1)),
      });
    }

    const profitTrend: ProfitTrendDTO[] = Object.values(monthMap);

    const profitMargin =
      totalRevenue === 0 ? 0 : (netProfit / totalRevenue) * 100;

    let previousProfit = 0;

    if (profits.length > 1) {
      previousProfit = profits[profits.length - 2].netProfit;
    }

    const profitGrowth =
      previousProfit === 0
        ? 0
        : ((netProfit - previousProfit) / previousProfit) * 100;

    const bestBranch = branchProfitability.sort(
      (a, b) => b.netProfit - a.netProfit,
    )[0];

    const insights: InsightDTO[] = [];

    insights.push({
      type: "growth",
      title: "Strong Growth",
      message: `Profit increased by ${profitGrowth.toFixed(
        1,
      )}% compared to last month`,
    });

    if (bestBranch) {
      insights.push({
        type: "best_performer",
        title: "Best Performer",
        message: `${bestBranch.branchName} generated highest profit`,
      });
    }

    if (profitMargin < 20) {
      insights.push({
        type: "warning",
        title: "Needs Attention",
        message: "Profit margin is below healthy level",
      });
    }

    return {
      summary: {
        netProfit,
        totalRevenue,
        totalExpense,
        profitMargin: Number(profitMargin.toFixed(1)),
        profitGrowth: Number(profitGrowth.toFixed(1)),
      },
      profitTrend,
      branchProfitability,
      insights,
    };
  }
}
