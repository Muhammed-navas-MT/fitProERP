import { TrendingUp } from "lucide-react";

interface SummaryCardsProps {
  netProfit: number;
  totalRevenue: number;
  totalExpense: number;
  profitMargin: number;
  profitGrowth: number;
}

function formatCurrency(val: number) {
  return `₹${val.toLocaleString("en-IN")}`;
}

export function SummaryCards({
  netProfit,
  totalRevenue,
  totalExpense,
  profitMargin,
  profitGrowth,
}: SummaryCardsProps) {
  const cards = [
    {
      label: "Net Profit",
      value: formatCurrency(netProfit),
      sub: (
        <span className="flex items-center gap-1 text-xs text-emerald-400">
          <TrendingUp className="h-3 w-3" />
          +{profitGrowth}% from last month
        </span>
      ),
    },
    {
      label: "Total Revenue",
      value: formatCurrency(totalRevenue),
      sub: <span className="text-xs text-zinc-500">This Month</span>,
    },
    {
      label: "Total Expenses",
      value: <span className="text-red-400">{formatCurrency(totalExpense)}</span>,
      sub: <span className="text-xs text-zinc-500">This Month</span>,
    },
    {
      label: "Profit Margin",
      value: `${profitMargin}%`,
      sub: <span className="text-xs text-emerald-400">Healthy margin</span>,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4"
        >
          <p className="text-xs text-zinc-400 mb-1">{card.label}</p>
          <p className="text-2xl font-bold text-zinc-100">{card.value}</p>
          <div className="mt-1">{card.sub}</div>
        </div>
      ))}
    </div>
  );
}
