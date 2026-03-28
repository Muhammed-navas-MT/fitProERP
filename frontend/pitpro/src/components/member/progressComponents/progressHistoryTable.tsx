import { getBMICategoryBg, getBMICategoryColor, ProgressType } from "@/types/member/progressTypes";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  data: ProgressType[];
}

export function ProgressHistoryTable({ data }: Props) {
  const sorted = [...data].sort(
    (a, b) => new Date(b.progressDate).getTime() - new Date(a.progressDate).getTime()
  );

  if (sorted.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground text-sm">
        No progress records yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {["Date", "Weight", "BMI", "Category", "Body Fat", "Muscle", "Note"].map((h) => (
              <th
                key={h}
                className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((entry, i) => {
            const prev = sorted[i + 1];
            const bmiDiff = prev ? entry.bmi - prev.bmi : 0;

            return (
              <tr
                key={entry.id || i}
                className="border-b border-border/50 hover:bg-secondary/50 transition-colors animate-slide-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <td className="py-3 px-4 text-sm text-foreground">
                  {new Date(entry.progressDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="py-3 px-4 text-sm font-semibold text-foreground">
                  {entry.weight.value} {entry.weight.unit}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{entry.bmi}</span>
                    {bmiDiff !== 0 && (
                      <span className={`flex items-center text-xs ${bmiDiff > 0 ? "text-warning" : "text-success"}`}>
                        {bmiDiff > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {Math.abs(bmiDiff).toFixed(1)}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getBMICategoryBg(entry.bmiCategory)} ${getBMICategoryColor(entry.bmiCategory)}`}
                  >
                    {entry.bmiCategory}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-muted-foreground">
                  {entry.bodyFatPercentage ? `${entry.bodyFatPercentage}%` : "—"}
                </td>
                <td className="py-3 px-4 text-sm text-muted-foreground">
                  {entry.muscleMass ? `${entry.muscleMass.value} ${entry.muscleMass.unit}` : "—"}
                </td>
                <td className="py-3 px-4 text-sm text-muted-foreground max-w-[200px] truncate">
                  {entry.note || "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
