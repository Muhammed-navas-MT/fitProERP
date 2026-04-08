import { SuperAdminDashboardDto } from "../../../dtos/superAdminDto/dashboardDto";
import { IBranchRepository } from "../../../interfaces/repository/gymAdmin/branchRepoInterface";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ISuperAdminPaymentRepository } from "../../../interfaces/repository/superAdmin/paymentRepoInterface";
import { IGetDashboardDetailUseCase } from "../../../interfaces/useCase/superAdmin/dashboardManagement/getDashboardDetailUseCaseInterface";
import { SuperAdminDashboardMapper } from "../../../mappers/superAdmin/dashboardMapper";

export class GetDashboardDetailUseCase implements IGetDashboardDetailUseCase {
  constructor(
    private _gymAdminRepository: IGymAdminRepository,
    private _branchRepository: IBranchRepository,
    private _superAdminPaymentRepository: ISuperAdminPaymentRepository,
  ) {}

  async execute(superAdminId: string): Promise<SuperAdminDashboardDto> {
    void superAdminId;

    const { currentStart, currentEnd, lastStart, lastEnd } =
      this.getMonthRanges();

    const [
      totalGymAdmins,
      gymAdminsThisMonth,
      gymAdminsLastMonth,
      totalBranches,
      branchesThisMonth,
      branchesLastMonth,
      monthlyRevenue,
      lastMonthRevenue,
      revenueOverview,
      gymAdminGrowth,
    ] = await Promise.all([
      this._gymAdminRepository.countTotalGymAdmins(),
      this._gymAdminRepository.countGymAdminsCreatedThisMonth(
        currentStart,
        currentEnd,
      ),
      this._gymAdminRepository.countGymAdminsCreatedLastMonth(
        lastStart,
        lastEnd,
      ),

      this._branchRepository.countTotalBranches(),
      this._branchRepository.countBranchesCreatedThisMonth(
        currentStart,
        currentEnd,
      ),
      this._branchRepository.countBranchesCreatedLastMonth(lastStart, lastEnd),

      this._superAdminPaymentRepository.getCurrentMonthRevenue(
        currentStart,
        currentEnd,
      ),
      this._superAdminPaymentRepository.getLastMonthRevenue(lastStart, lastEnd),

      this._superAdminPaymentRepository.getRevenueOverviewByMonth(6),
      this._gymAdminRepository.getGymAdminGrowthByMonth(6),
    ]);

    const gymAdminGrowthPercentage = this.calculateGrowthPercentage(
      gymAdminsThisMonth,
      gymAdminsLastMonth,
    );

    const branchGrowthPercentage = this.calculateGrowthPercentage(
      branchesThisMonth,
      branchesLastMonth,
    );

    const revenueGrowthPercentage = this.calculateGrowthPercentage(
      monthlyRevenue,
      lastMonthRevenue,
    );

    return SuperAdminDashboardMapper.toDto({
      totalGymAdmins,
      gymAdminGrowthPercentage,
      totalBranches,
      branchGrowthPercentage,
      monthlyRevenue,
      revenueGrowthPercentage,
      revenueOverview,
      gymAdminGrowth,
    });
  }

  private getMonthRanges(): {
    currentStart: Date;
    currentEnd: Date;
    lastStart: Date;
    lastEnd: Date;
  } {
    const now = new Date();
    const currentStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const lastStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastEnd = new Date(now.getFullYear(), now.getMonth(), 1);

    return {
      currentStart,
      currentEnd,
      lastStart,
      lastEnd,
    };
  }

  private calculateGrowthPercentage(current: number, previous: number): number {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }
    return Number((((current - previous) / previous) * 100).toFixed(2));
  }
}
