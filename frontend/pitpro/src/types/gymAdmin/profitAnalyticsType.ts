export interface ProfitTrend {
  month: string;
  revenue: number;
  expense: number;
  profit: number;
}

export interface BranchProfitability {
  branchId: string;
  branchName: string;
  totalRevenue: number;
  totalExpense: number;
  netProfit: number;
  profitMargin: number;
}

export interface Insight {
  type: "growth" | "best_performer" | "warning";
  title: string;
  message: string;
}

export interface GymProfitAnalytics {
  summary: {
    netProfit: number;
    totalRevenue: number;
    totalExpense: number;
    profitMargin: number;
    profitGrowth: number;
  };
  profitTrend: ProfitTrend[];
  branchProfitability: BranchProfitability[];
  insights: Insight[];
}
