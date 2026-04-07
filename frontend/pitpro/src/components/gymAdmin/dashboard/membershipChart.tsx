"use client";

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
    <div className="rounded-lg border border-orange-500/20 bg-black/40 p-6">
      <div className="mb-4 flex items-center gap-2">
        <svg
          className="h-5 w-5 text-orange-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
        <h3 className="text-lg font-semibold text-white">Membership Growth</h3>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="month" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#000",
              border: "1px solid #333",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#f97316"
            strokeWidth={3}
            name="Members"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
