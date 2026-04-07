export interface GymAdminDashboardType {
  totalMembers: number;
  totalTrainers: number;
  totalBranches: number;

  activeMembers: number;
  activeTrainers: number;
  activeBranches: number;

  thisMonthRevenue: number;

  memberShipGrowth: MemberShipGrowthType[];
  revenueGrowth: RevenueGrowthType[];
  recentActivities: ActivityType[];
}

export interface MemberShipGrowthType {
  month: string;
  count: number;
}

export interface RevenueGrowthType {
  month: string;
  revenue: number;
}

export interface ActivityType {
  id: number;
  action: string;
  name: string;
  time: string;
}
