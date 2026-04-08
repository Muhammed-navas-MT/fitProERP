import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TooltipContentProps } from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { IndianRupee } from "lucide-react";

interface RevenueData {
  month: string;
  revenue: number;
}

interface RevenueOverviewChartProps {
  data: RevenueData[];
}

const formatCurrency = (value: number): string => {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>) => {
  if (active && payload?.length && payload[0]?.value != null) {
    return (
      <div className="rounded-xl border border-slate-700 bg-[#0f172a]/95 px-4 py-3 shadow-xl backdrop-blur-sm">
        <p className="text-xs font-medium text-slate-400">{String(label ?? "")}</p>
        <p className="text-lg font-bold text-white">
          ₹{Number(payload[0].value).toLocaleString("en-IN")}
        </p>
      </div>
    );
  }

  return null;
};

const RevenueOverviewChart = ({
  data,
}: RevenueOverviewChartProps) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="rounded-xl border border-slate-800 bg-[#1a1f24] p-6"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-500/15 p-2.5 text-violet-400">
            <IndianRupee className="h-5 w-5" />
          </div>

          <div>
            <h3 className="font-semibold text-white">Revenue Overview</h3>
            <p className="text-xs text-slate-400">Monthly revenue trend</p>
          </div>
        </div>

        <div className="flex gap-1">
          {["6M", "1Y", "All"].map((period) => (
            <button
              key={period}
              type="button"
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                period === "6M"
                  ? "bg-violet-500 text-white"
                  : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickFormatter={(value) => formatCurrency(Number(value))}
            />

            <Tooltip content={CustomTooltip} />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              fill="url(#revenueGradient)"
              dot={{
                r: 4,
                fill: "#8b5cf6",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                stroke: "#8b5cf6",
                strokeWidth: 2,
                fill: "#ffffff",
              }}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default RevenueOverviewChart;