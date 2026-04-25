import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
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
import { Crown } from "lucide-react";

interface PlanDistributionItem {
  planName: string;
  count: number;
}

interface SubscriptionAnalysisData {
  totalSubscriptions: number;
  activeSubscriptions: number;
  inactiveSubscriptions: number;
  planDistribution: PlanDistributionItem[];
}

interface Props {
  data?: SubscriptionAnalysisData;
}


const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-violet-500/30 bg-[#111827] px-4 py-3 shadow-xl">
      <p className="text-xs text-slate-400">{String(label ?? "")}</p>
      <p className="text-lg font-bold text-white">
        {Number(payload[0].value)}
      </p>
    </div>
  );
};

const SubscriptionAnalyticsChart = ({ data }: Props) => {
  const planData = data?.planDistribution ?? [];

  const statusData = [
    { name: "Active", value: data?.activeSubscriptions ?? 0 },
    { name: "Inactive", value: data?.inactiveSubscriptions ?? 0 },
  ];

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-slate-800 bg-[#1a1f24] p-6 xl:col-span-2"
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-violet-500/15 p-2.5 text-violet-400">
          <Crown className="h-5 w-5" />
        </div>

        <div>
          <h3 className="text-white font-semibold">
            Subscription Analysis
          </h3>
          <p className="text-xs text-slate-400">
            Plan distribution and subscription status
          </p>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="rounded-lg bg-[#0f1419] p-4 text-center">
          <p className="text-xs text-slate-400">Total</p>
          <p className="text-lg font-bold text-white">
            {data?.totalSubscriptions ?? 0}
          </p>
        </div>

        <div className="rounded-lg bg-[#0f1419] p-4 text-center">
          <p className="text-xs text-slate-400">Active</p>
          <p className="text-lg font-bold text-emerald-400">
            {data?.activeSubscriptions ?? 0}
          </p>
        </div>

        <div className="rounded-lg bg-[#0f1419] p-4 text-center">
          <p className="text-xs text-slate-400">Inactive</p>
          <p className="text-lg font-bold text-red-400">
            {data?.inactiveSubscriptions ?? 0}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* LEFT → Plan Distribution */}
        <div className="rounded-xl border border-slate-800 bg-[#0f1419] p-4">
          <h4 className="text-sm font-semibold text-white mb-4">
            Plan Distribution
          </h4>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={planData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  vertical={false}
                />

                <XAxis
                  dataKey="planName"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />

                <Tooltip content={CustomTooltip} />

                <Bar
                  dataKey="count"
                  fill="#8b5cf6"
                  radius={[8, 8, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT → Active vs Inactive */}
        <div className="rounded-xl border border-slate-800 bg-[#0f1419] p-4">
          <h4 className="text-sm font-semibold text-white mb-4">
            Subscription Status
          </h4>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                >
                  <Cell fill="#22c55e" /> {/* Active */}
                  <Cell fill="#ef4444" /> {/* Inactive */}
                </Pie>

                <Tooltip content={CustomTooltip} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Labels */}
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-emerald-400">
              <div className="h-3 w-3 rounded-full bg-emerald-400" />
              Active
            </div>

            <div className="flex items-center gap-2 text-red-400">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              Inactive
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SubscriptionAnalyticsChart;