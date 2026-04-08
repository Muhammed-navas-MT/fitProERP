import {
  GymGrowthDto,
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
    };
  }
}
