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
  subscriptionAnalysis: SubscriptionAnalysisData;
}

export interface RevenueOverviewDto {
  month: string;
  revenue: number;
}

export interface GymGrowthDto {
  month: string;
  count: number;
}

export interface PlanDistributionItem {
  planName: string;
  count: number;
}

export interface SubscriptionAnalysisData {
  totalSubscriptions: number;
  activeSubscriptions: number;
  inactiveSubscriptions: number;
  planDistribution: PlanDistributionItem[];
}

export interface PlanDistributionType {
  planName: string;
  count: number;
}
