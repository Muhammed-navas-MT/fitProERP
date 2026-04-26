import {
  GymGrowthDto,
  PlanDistributionType,
  RevenueOverviewDto,
  SuperAdminDashboardDto,
} from "../../dtos/superAdminDto/dashboardDto";

interface SuperAdminDashboardMapperInput {
  totalGymAdmins: number;
  gymAdminGrowthPercentage: number;
  totalBranches: number;
  branchGrowthPercentage: number;
  monthlyRevenue: number;
  revenueGrowthPercentage: number;
  revenueOverview: RevenueOverviewDto[];
  gymAdminGrowth: GymGrowthDto[];
  subscriptioncounts: { total: number; active: number; inactive: number };
  planDistribution: PlanDistributionType[];
}

export class SuperAdminDashboardMapper {
  static toDto(data: SuperAdminDashboardMapperInput): SuperAdminDashboardDto {
    return {
      summary: {
        totalBranches: data.totalBranches,
        branchGrowthPercentage: data.branchGrowthPercentage,
        totalGyms: data.totalGymAdmins,
        gymGrowthPercentage: data.gymAdminGrowthPercentage,
        monthlyRevenue: data.monthlyRevenue,
        revenueGrowthPercentage: data.revenueGrowthPercentage,
      },
      revenueOverview: data.revenueOverview,
      gymGrowth: data.gymAdminGrowth,
      subscriptionAnalysis: {
        activeSubscriptions: data.subscriptioncounts.active,
        inactiveSubscriptions: data.subscriptioncounts.inactive,
        totalSubscriptions: data.subscriptioncounts.total,
        planDistribution: data.planDistribution,
      },
    };
  }
}
