export interface GymAdminDashboardDto {
  totalMembers: number;
  totalTrainers: number;
  totalBranches: number;

  activeMembers: number;
  activeTrainers: number;
  activeBranches: number;

  thisMonthRevenue: number;

  memberShipGrowth: MemberShipGrowthDto[];
  revenueGrowth: RevenueGrowthDto[];
  recentActivities: ActivityDto[];
}

export interface MemberShipGrowthDto {
  month: string;
  count: number;
}

export interface RevenueGrowthDto {
  month: string;
  revenue: number;
}

export interface ActivityDto {
  id: number;
  action: string;
  name: string;
  time: string;
}
