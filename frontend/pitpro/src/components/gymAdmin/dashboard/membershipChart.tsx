"use client";

import { Users } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MemberShipGrowthType {
  month: string;
  count: number;
}

interface MembershipChartProps {
  data: MemberShipGrowthType[];
}

export function MembershipChart({ data }: MembershipChartProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
          <Users className="h-4 w-4" />
        </span>
        <h3 className="text-base font-semibold text-white">Membership Growth</h3>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
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
            allowDecimals={false}
          />
          <Tooltip
            cursor={{ stroke: "#3f3f46" }}
            contentStyle={{
              backgroundColor: "#09090b",
              border: "1px solid #27272a",
              borderRadius: "10px",
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#f97316"
            strokeWidth={2.5}
            name="Members"
            dot={{ r: 3, fill: "#f97316", strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
