import { BranchProfitability } from "@/components/gymAdmin/profitComponents/BranchProfitability";
import { KeyInsights } from "@/components/gymAdmin/profitComponents/KeyInsights";
import ProfitAnalyticsSkeleton from "@/components/gymAdmin/profitComponents/ProfitAnalyticsSkeleton";
import { ProfitTrendChart } from "@/components/gymAdmin/profitComponents/ProfitTrendChart";
import { SummaryCards } from "@/components/gymAdmin/profitComponents/SummaryCards";
import { Sidebar } from "@/components/gymAdmin/sidebar";
import { TopBar } from "@/components/gymAdmin/topbar";
import { useProfitAnalytics } from "@/hook/gymAdmin/profitHook";
import type { Insight } from "@/types/gymAdmin/profitAnalyticsType";

const ProfitAnalytics = () => {
  const { data, isLoading } = useProfitAnalytics();

  const { summary, profitTrend, branchProfitability, insights } =
    data?.data || {};

    console.log(summary)

  return (
    <div className="min-h-screen bg-zinc-950">
      <Sidebar />

      <TopBar
        title="Profit Analytics"
        subtitle="Financial performance and profitability metrics"
      >
        {isLoading ? (
          <ProfitAnalyticsSkeleton />
        ) : (
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

              {insights && (
                <KeyInsights insights={insights as Insight[]} />
              )}

            </div>

          </div>
        )}
      </TopBar>
    </div>
  );
};

export default ProfitAnalytics;