import { NotificationType } from "../../../../domain/enums/notificationTypes";
import { Roles } from "../../../../domain/enums/roles";
import { IBranchRepository } from "../../../interfaces/repository/gymAdmin/branchRepoInterface";
import { IGymAdminExpenseRepository } from "../../../interfaces/repository/gymAdmin/expenseRepoInterface";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IProfitRepository } from "../../../interfaces/repository/gymAdmin/profitRepoInterface";
import { IGymAdminRevenueRepository } from "../../../interfaces/repository/gymAdmin/revenueRepoInterface";
import { INotificationService } from "../../../interfaces/service/notificationServiceInterface";
import { IGenerateMonthlyProfitUseCase } from "../../../interfaces/useCase/gymAdmin/profitManagement/generateMonthlyProfitUseCaseInterface";

export class GenerateMonthlyProfitUseCase implements IGenerateMonthlyProfitUseCase {
  constructor(
    private _profitRepository: IProfitRepository,
    private _expenseRepository: IGymAdminExpenseRepository,
    private _revenueRepository: IGymAdminRevenueRepository,
    private _gymAdminRepository: IGymAdminRepository,
    private _branchRepository: IBranchRepository,
    private _notificationService: INotificationService,
  ) {}

  async execute(): Promise<void> {
    const start = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      1,
    );

    const end = new Date(new Date().getFullYear(), new Date().getMonth(), 0);

    const gymsIds = await this._gymAdminRepository.findAllGymIds();

    const monthLabel = start.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });

    for (const gymId of gymsIds) {
      const branches = await this._branchRepository.findAllBranchIds(gymId);

      for (const branchId of branches) {
        const totalRevenue = await this._revenueRepository.calculateTotalByDate(
          gymId,
          branchId,
          start,
          end,
        );

        const totalExpense = await this._expenseRepository.calculateTotalByDate(
          gymId,
          branchId,
          start,
          end,
        );

        const revenueCount = await this._revenueRepository.countByDate(
          gymId,
          branchId,
          start,
          end,
        );

        const expenseCount = await this._expenseRepository.countByDate(
          gymId,
          branchId,
          start,
          end,
        );

        const netProfit = totalRevenue - totalExpense;

        await this._profitRepository.create({
          gymId: gymId,
          branchId: branchId,
          totalRevenue,
          totalExpense,
          netProfit,
          revenueCount,
          expenseCount,
          periodStart: start,
          periodEnd: end,
        });
        await this._notificationService.notify({
          receiverId: gymId.toString(),
          receiverRole: Roles.GYMADMIN,
          title: "Monthly Profit Generated",
          message: `${monthLabel} profit report has been generated successfully. Net profit: ₹${netProfit}.`,
          type: NotificationType.PROFIT_GENERATED,
          relatedId: branchId.toString(),
          relatedModel: "Profit",
          actionLink: "/gym-admin/profit",
        });
      }
    }
  }
}
