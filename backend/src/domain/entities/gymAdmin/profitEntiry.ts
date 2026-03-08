export interface IGymAdminProfitEntity {
  id?: string;
  gymId: string;
  branchId: string;
  totalRevenue: number;
  totalExpense: number;
  netProfit: number;
  revenueCount: number;
  expenseCount: number;
  periodStart: Date;
  periodEnd: Date;
  createdAt?: Date;
}
