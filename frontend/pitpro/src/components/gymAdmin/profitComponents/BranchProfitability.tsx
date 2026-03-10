import type { BranchProfitability } from "@/types/gymAdmin/profitAnalyticsType";

interface BranchProfitabilityProps {
  branches: BranchProfitability[];
}

export function BranchProfitability({ branches }: BranchProfitabilityProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
      <h2 className="text-lg font-semibold text-zinc-100 mb-4">
        Branch-wise Profitability
      </h2>
      <div className="space-y-4">
        {branches.map((branch) => (
          <div
            key={branch.branchId}
            className="flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-medium text-zinc-100">
                {branch.branchName}
              </p>
              <p className="text-xs text-zinc-500">
                Profit Margin: {branch.profitMargin}%
              </p>
            </div>
            <p className="text-sm font-semibold text-emerald-400">
              ₹{branch.netProfit.toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
