import { BranchProfitability } from "@/components/gymAdmin/profitComponents/BranchProfitability";
import { KeyInsights } from "@/components/gymAdmin/profitComponents/KeyInsights";
import { ProfitTrendChart } from "@/components/gymAdmin/profitComponents/ProfitTrendChart";
import { SummaryCards } from "@/components/gymAdmin/profitComponents/SummaryCards";
import { Sidebar } from "@/components/gymAdmin/sidebar";
import { TopBar } from "@/components/gymAdmin/topbar";
import { useProfitAnalytics } from "@/hook/gymAdmin/profitHook";
import type { Insight } from "@/types/gymAdmin/profitAnalyticsType";

const ProfitAnalytics = () => {

//   // Default: last 4 months
//   const endDate = new Date().toISOString();
//   const startDate = new Date(
//     new Date().setMonth(new Date().getMonth() - 4)
//   ).toISOString();

  const { data, isLoading } = useProfitAnalytics();

  if (isLoading) {
    return <div className="text-white p-10">Loading analytics...</div>;
  }

  const { summary, profitTrend, branchProfitability, insights } =
    data?.data || {};

  return (
    <div className="min-h-screen bg-zinc-950">
      <Sidebar />

      <TopBar
        title="Profit Analytics"
        subtitle="Financial performance and profitability metrics"
      >
        <div className="space-y-6">

          {summary && (
            <SummaryCards
              netProfit={summary.netProfit}
              totalRevenue={summary.totalRevenue}
              totalExpense={summary.totalExpense}
              profitMargin={summary.profitMargin}
              profitGrowth={summary.profitGrowth}
            />
          )}

          {profitTrend && <ProfitTrendChart data={profitTrend} />}

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

            {branchProfitability && (
              <BranchProfitability branches={branchProfitability} />
            )}

            {insights && <KeyInsights insights={insights as Insight[]} />}

          </div>

        </div>
      </TopBar>
    </div>
  );
};

export default ProfitAnalytics;