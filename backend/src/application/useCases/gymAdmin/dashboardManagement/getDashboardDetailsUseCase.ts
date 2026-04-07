import { GymAdminDashboardDto } from "../../../dtos/gymAdminDto/dashboardDto";
import { IBranchRepository } from "../../../interfaces/repository/gymAdmin/branchRepoInterface";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IGymAdminRevenueRepository } from "../../../interfaces/repository/gymAdmin/revenueRepoInterface";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IGetDashboardUseCaseInterface } from "../../../interfaces/useCase/gymAdmin/dashboardManagement/getDashboardDetailUseCaseInterface";

export class GetDashboardDetailsUseCase implements IGetDashboardUseCaseInterface {
  constructor(
    private _memberRepository: IMemberRepository,
    private _trainerRepository: ITrainerRepository,
    private _branchRepository: IBranchRepository,
    private _revenueRepository: IGymAdminRevenueRepository,
    private _gymAdminRepository: IGymAdminRepository,
  ) {}

  async execute(gymAdminId: string): Promise<GymAdminDashboardDto> {
    const gymAdmin = await this._gymAdminRepository.findById(gymAdminId);

    if (!gymAdmin) {
      throw new Error("Gym admin not found");
    }
    const now = new Date();

    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const today = now;

    const [
      totalMembers,
      totalTrainers,
      totalBranches,
      activeMembers,
      activeTrainers,
      activeBranches,
      thisMonthRevenue,
      memberShipGrowth,
      revenueGrowth,
      recentActivities,
    ] = await Promise.all([
      this._memberRepository.countByGymId(gymAdminId),
      this._trainerRepository.countByGymId(gymAdminId),
      this._branchRepository.countByGymId(gymAdminId),

      this._memberRepository.countActiveByGymId(gymAdminId),
      this._trainerRepository.countActiveByGymId(gymAdminId),
      this._branchRepository.countActiveByGymId(gymAdminId),

      this._revenueRepository.totalRevenueByMonth(
        gymAdminId,
        currentMonthStart,
        today,
      ),
      this._revenueRepository.getMonthlyPlanCountsByGymId(gymAdminId),
      this._revenueRepository.getRevenueGrowthByGymId(gymAdminId),
      this._revenueRepository.getRecentActivitiesByGymId(gymAdminId),
    ]);

    return {
      totalMembers,
      totalTrainers,
      totalBranches,
      activeMembers,
      activeTrainers,
      activeBranches,
      thisMonthRevenue,
      memberShipGrowth,
      revenueGrowth,
      recentActivities,
    };
  }
}
