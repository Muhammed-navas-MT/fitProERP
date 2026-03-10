import { GymProfitAnalyticsDTO } from "../../../dtos/gymAdminDto/profitDto";
import { IGymAdminExpenseRepository } from "../../../interfaces/repository/gymAdmin/expenseRepoInterface";
import { IProfitRepository } from "../../../interfaces/repository/gymAdmin/profitRepoInterface";
import { IGymAdminRevenueRepository } from "../../../interfaces/repository/gymAdmin/revenueRepoInterface";
import { IGetProfitAnalyticsUseCase } from "../../../interfaces/useCase/gymAdmin/profitManagement/getProfitAnalyticsUseCaseInterface";

export class GetProfitAnalyticsUseCase implements IGetProfitAnalyticsUseCase {
  constructor(
    private _profitRepository: IProfitRepository,
    private _revenueRepository: IGymAdminRevenueRepository,
    private _expenseRepository: IGymAdminExpenseRepository,
  ) {}

  async execute(
    gymId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<GymProfitAnalyticsDTO> {
    const now = new Date();

    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const today = now;

    const revenue = await this._revenueRepository.totalRevenueByMonth(
      gymId,
      currentMonthStart,
      today,
    );

    const expense = await this._expenseRepository.totalExpenseByMonth(
      gymId,
      currentMonthStart,
      today,
    );

    const analytics = await this._profitRepository.getProfitAnalytics(
      gymId,
      startDate,
      endDate,
    );

    return {
      ...analytics,
      summary: {
        ...analytics.summary,
        totalRevenue: revenue,
        totalExpense: expense,
      },
    };
  }
}
