import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ExpenseSummary {
  Equipment: number;
  Maintenance: number;
  Marketing: number;
  Other: number;
  Rent: number;
  TrainerCommission: number;
  Utilities: number;
  month: string;
}

interface Props {
  data: ExpenseSummary[];
}

export function ExpenseStackedBarChart({ data }: Props) {
  return (
    <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
      <h3 className="mb-4 font-semibold text-white">
        Previous 12 Month Expense Breakdown
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <XAxis
            dataKey="month"
            interval={0}
            angle={-35}
            textAnchor="end"
            height={60}
            tick={{ fontSize: 12, fill: "#a1a1aa" }}
          />

          <Tooltip />

          <Legend />

          <Bar dataKey="Rent" stackId="a" fill="#f87171" />
          <Bar dataKey="Utilities" stackId="a" fill="#60a5fa" />
          <Bar dataKey="Maintenance" stackId="a" fill="#facc15" />
          <Bar dataKey="Equipment" stackId="a" fill="#34d399" />
          <Bar dataKey="Marketing" stackId="a" fill="#a78bfa" />
          <Bar dataKey="TrainerCommission" stackId="a" fill="#fb923c" />
          <Bar dataKey="Other" stackId="a" fill="#94a3b8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}