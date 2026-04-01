import {
  getBMICategoryBg,
  getBMICategoryColor,
  ProgressType,
} from "@/types/member/progressTypes";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  data: ProgressType[];
}

export function ProgressHistoryTable({ data }: Props) {
  const sorted = [...data].sort(
    (a, b) =>
      new Date(b.progressDate).getTime() -
      new Date(a.progressDate).getTime(),
  );

  if (sorted.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-zinc-400">
        No progress records yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-[#111]">
      <table className="w-full">
        <thead>
          <tr>
            {[
              "Date",
              "Weight",
              "BMI",
              "Category",
              "Body Fat",
              "Muscle",
              "Note",
            ].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500"
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
                className="transition-colors duration-200 hover:bg-white/5"
              >
                <td className="px-4 py-3 text-sm text-white">
                  {new Date(entry.progressDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>

                <td className="px-4 py-3 text-sm font-semibold text-white">
                  {entry.weight.value} {entry.weight.unit}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      {entry.bmi}
                    </span>

                    {bmiDiff !== 0 && (
                      <span
                        className={`flex items-center text-xs ${
                          bmiDiff > 0
                            ? "text-orange-400"
                            : "text-green-400"
                        }`}
                      >
                        {bmiDiff > 0 ? (
                          <TrendingUp size={12} />
                        ) : (
                          <TrendingDown size={12} />
                        )}
                        {Math.abs(bmiDiff).toFixed(1)}
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${getBMICategoryBg(
                      entry.bmiCategory,
                    )} ${getBMICategoryColor(entry.bmiCategory)}`}
                  >
                    {entry.bmiCategory}
                  </span>
                </td>

                <td className="px-4 py-3 text-sm text-zinc-400">
                  {entry.bodyFatPercentage !== undefined
                    ? `${entry.bodyFatPercentage}%`
                    : "—"}
                </td>

                <td className="px-4 py-3 text-sm text-zinc-400">
                  {entry.muscleMass
                    ? `${entry.muscleMass.value} ${entry.muscleMass.unit}`
                    : "—"}
                </td>

                <td className="max-w-[200px] px-4 py-3 text-sm text-zinc-400">
                  <div className="truncate">{entry.note || "—"}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}