import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ProfitTrend } from "@/types/gymAdmin/profitAnalyticsType";

interface ProfitTrendChartProps {
  data: ProfitTrend[];
}

export function ProfitTrendChart({ data }: ProfitTrendChartProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
      <h2 className="text-lg font-semibold text-zinc-100 mb-4">Profit Trend</h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis dataKey="month" tick={{ fill: "#a1a1aa", fontSize: 12 }} axisLine={false} />
          <YAxis tick={{ fill: "#a1a1aa", fontSize: 12 }} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #3f3f46",
              borderRadius: 8,
              color: "#fafafa",
            }}
          />
          <Legend
            wrapperStyle={{ color: "#a1a1aa", fontSize: 12 }}
          />
          <Bar dataKey="revenue" fill="#f97316" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
          <Bar dataKey="profit" fill="#14b8a6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-center text-xs text-zinc-500 mt-2">Downtown</p>
    </div>
  );
}
