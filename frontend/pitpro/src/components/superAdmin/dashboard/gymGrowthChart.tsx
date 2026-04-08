import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
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
import { Dumbbell } from "lucide-react";

interface GymGrowthData {
  month: string;
  count: number;
}

interface GymGrowthChartProps {
  data: GymGrowthData[];
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>) => {
  if (!active || !payload?.length || payload[0]?.value == null) {
    return null;
  }

  const value = Number(payload[0].value);

  return (
    <div className="rounded-xl border border-violet-500/30 bg-[#111827] px-4 py-3 shadow-2xl">
      <p className="text-xs font-medium text-slate-400">{String(label ?? "")}</p>
      <p className="mt-1 text-lg font-bold text-white">
        {value} {value === 1 ? "gym" : "gyms"}
      </p>
    </div>
  );
};

const GymGrowthChart = ({ data }: GymGrowthChartProps) => {
  const totalNewGyms = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="rounded-xl border border-slate-800 bg-[#1a1f24] p-6"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-500/15 p-2.5 text-violet-400">
            <Dumbbell className="h-5 w-5" />
          </div>

          <div>
            <h3 className="font-semibold text-white">Gym Growth</h3>
            <p className="text-xs text-slate-400">New gyms added per month</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-white">{totalNewGyms}</p>
          <p className="text-xs text-slate-400">Total new</p>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barCategoryGap="25%"
          >
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
              allowDecimals={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />

            <Tooltip
              content={CustomTooltip}
              cursor={{ fill: "rgba(139, 92, 246, 0.12)" }}
            />

            <Bar
              dataKey="count"
              fill="#8b5cf6"
              radius={[8, 8, 0, 0]}
              barSize={42}
              animationDuration={900}
              activeBar={{
                fill: "#a78bfa",
                stroke: "#c4b5fd",
                strokeWidth: 1,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default GymGrowthChart;