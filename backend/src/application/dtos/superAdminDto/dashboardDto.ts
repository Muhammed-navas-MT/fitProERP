export interface SuperAdminDashboardDto {
  summary: {
    totalGyms: number;
    gymGrowthPercentage: number;
    totalBranches: number;
    branchGrowthPercentage: number;
    monthlyRevenue: number;
    revenueGrowthPercentage: number;
  };
  revenueOverview: RevenueOverviewDto[];
  gymGrowth: GymGrowthDto[];
}

export interface RevenueOverviewDto {
  month: string;
  revenue: number;
}

export interface GymGrowthDto {
  month: string;
  count: number;
}
