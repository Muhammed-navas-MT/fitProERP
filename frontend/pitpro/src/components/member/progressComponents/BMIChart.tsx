import { ProgressType } from "@/types/member/progressTypes";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
} from "recharts";

interface BMIChartProps {
  data: ProgressType[];
}

export function BMIChart({ data }: BMIChartProps) {
  const chartData = data
    .sort((a, b) => new Date(a.progressDate).getTime() - new Date(b.progressDate).getTime())
    .map((entry) => ({
      name: new Date(entry.progressDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      bmi: entry.bmi,
      weight: entry.weight.value,
    }));

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
        No data yet. Create your first report!
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="bmiGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" />
        <XAxis
          dataKey="name"
          stroke="hsl(0, 0%, 40%)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="hsl(0, 0%, 40%)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          domain={["dataMin - 2", "dataMax + 2"]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(0, 0%, 7%)",
            border: "1px solid hsl(0, 0%, 16%)",
            borderRadius: "12px",
            color: "hsl(0, 0%, 95%)",
            fontSize: "13px",
          }}
        />
        <ReferenceLine
          y={18.5}
          stroke="hsl(199, 89%, 48%)"
          strokeDasharray="4 4"
          strokeOpacity={0.5}
        />
        <ReferenceLine
          y={25}
          stroke="hsl(38, 92%, 50%)"
          strokeDasharray="4 4"
          strokeOpacity={0.5}
        />
        <ReferenceLine
          y={30}
          stroke="hsl(0, 84%, 60%)"
          strokeDasharray="4 4"
          strokeOpacity={0.5}
        />
        <Area
          type="monotone"
          dataKey="bmi"
          stroke="hsl(24, 95%, 53%)"
          strokeWidth={3}
          fill="url(#bmiGradient)"
          dot={{ fill: "hsl(24, 95%, 53%)", strokeWidth: 0, r: 5 }}
          activeDot={{ r: 7, fill: "hsl(24, 95%, 53%)", stroke: "hsl(0, 0%, 7%)", strokeWidth: 3 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
