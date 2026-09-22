"use client";

import { TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RevenueGrowthType {
  month: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueGrowthType[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
          <TrendingUp className="h-4 w-4" />
        </span>
        <h3 className="text-base font-semibold text-white">Revenue Overview</h3>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity={0.95} />
              <stop offset="100%" stopColor="#f97316" stopOpacity={0.55} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#27272a"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            stroke="#52525b"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            stroke="#52525b"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            width={48}
          />
          <Tooltip
            cursor={{ fill: "rgba(249,115,22,0.08)" }}
            contentStyle={{
              backgroundColor: "#09090b",
              border: "1px solid #27272a",
              borderRadius: "10px",
              color: "#fff",
            }}
            formatter={(value) => {
              const amount =
                typeof value === "number" ? value : Number(value ?? 0);

              return [`₹${amount.toLocaleString()}`, "Revenue"];
            }}
          />
          <Bar dataKey="revenue" fill="url(#revenueBar)" radius={[6, 6, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
