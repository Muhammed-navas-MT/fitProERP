import { useState } from "react";
import { Sidebar } from "@/components/member/memberSidebar";
import { Topbar } from "@/components/member/topbar";
import {
  Scale,
  Activity,
  TrendingDown,
  TrendingUp,
  Percent,
  Dumbbell,
} from "lucide-react";
import {
  getBMICategoryBg,
  getBMICategoryColor,
  ProgressType,
} from "@/types/member/progressTypes";
import { CreateProgressModal } from "@/components/member/progressComponents/createProgressModal";
import { BMIChart } from "@/components/member/progressComponents/BMIChart";
import { ProgressHistoryTable } from "@/components/member/progressComponents/progressHistoryTable";

const mockData: ProgressType[] = [
  {
    id: "1",
    memberId: "m1",
    weight: { value: 82, unit: "kg" },
    bmi: 26.2,
    bmiCategory: "Overweight",
    bodyFatPercentage: 22,
    muscleMass: { value: 38, unit: "kg" },
    note: "Starting my fitness journey",
    progressDate: new Date("2025-01-10"),
  },
  {
    id: "2",
    memberId: "m1",
    weight: { value: 80, unit: "kg" },
    bmi: 25.6,
    bmiCategory: "Overweight",
    bodyFatPercentage: 20.5,
    muscleMass: { value: 39, unit: "kg" },
    progressDate: new Date("2025-02-05"),
  },
  {
    id: "3",
    memberId: "m1",
    weight: { value: 78, unit: "kg" },
    bmi: 24.9,
    bmiCategory: "Normal",
    bodyFatPercentage: 19,
    muscleMass: { value: 40, unit: "kg" },
    note: "Reached normal BMI range!",
    progressDate: new Date("2025-03-01"),
  },
  {
    id: "4",
    memberId: "m1",
    weight: { value: 76.5, unit: "kg" },
    bmi: 24.5,
    bmiCategory: "Normal",
    bodyFatPercentage: 17.8,
    muscleMass: { value: 41.2, unit: "kg" },
    progressDate: new Date("2025-03-20"),
  },
];

export default function ProgressPage() {
  const [progressData, setProgressData] = useState<ProgressType[]>(mockData);

  const handleAddProgress = (entry: ProgressType) => {
    setProgressData((prev) => [
      ...prev,
      { ...entry, id: Date.now().toString() },
    ]);
  };

  const sortedData = [...progressData].sort(
    (a, b) =>
      new Date(b.progressDate).getTime() - new Date(a.progressDate).getTime()
  );

  const latest = sortedData[0];
  const previous = sortedData[1];

  const weightChange =
    latest && previous ? latest.weight.value - previous.weight.value : 0;

  const bmiChange = latest && previous ? latest.bmi - previous.bmi : 0;

  const stats = [
    {
      label: "Current Weight",
      value: latest ? `${latest.weight.value} ${latest.weight.unit}` : "—",
      icon: Scale,
      change: weightChange,
      suffix: latest?.weight.unit || "",
    },
    {
      label: "Current BMI",
      value: latest ? latest.bmi.toString() : "—",
      icon: Activity,
      change: bmiChange,
      badge: latest?.bmiCategory,
    },
    {
      label: "Body Fat",
      value:
        latest?.bodyFatPercentage !== undefined
          ? `${latest.bodyFatPercentage}%`
          : "—",
      icon: Percent,
    },
    {
      label: "Muscle Mass",
      value: latest?.muscleMass
        ? `${latest.muscleMass.value} ${latest.muscleMass.unit}`
        : "—",
      icon: Dumbbell,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Sidebar />

      <div className="md:ml-[260px] min-h-screen">
        <Topbar
          avatar="JD"
          title="Progress"
          subtitle="Track your body metrics"
        />

        <main className="px-4 py-6 sm:px-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-black">
                BMI & Body Progress
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {progressData.length} records tracked
              </p>
            </div>

            <div className="self-start md:self-auto">
              <CreateProgressModal onSubmit={handleAddProgress} />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      {stat.label}
                    </p>

                    <p className="text-2xl font-black text-black mt-1 break-words">
                      {stat.value}
                    </p>

                    {stat.change !== undefined && stat.change !== 0 && (
                      <div
                        className={`flex items-center gap-1 mt-1 text-xs font-medium ${
                          stat.change < 0 ? "text-green-600" : "text-orange-500"
                        }`}
                      >
                        {stat.change < 0 ? (
                          <TrendingDown size={12} />
                        ) : (
                          <TrendingUp size={12} />
                        )}
                        {Math.abs(stat.change).toFixed(1)} {stat.suffix || ""}
                      </div>
                    )}

                    {stat.badge && (
                      <span
                        className={`inline-block mt-2 px-2 py-1 rounded-full text-[11px] font-semibold border ${getBMICategoryBg(
                          stat.badge
                        )} ${getBMICategoryColor(stat.badge)}`}
                      >
                        {stat.badge}
                      </span>
                    )}
                  </div>

                  <div className="shrink-0 p-3 rounded-2xl bg-gray-100">
                    <stat.icon size={20} className="text-black" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
            <h3 className="text-lg font-bold text-black mb-4">BMI Trend</h3>

            <div className="flex flex-wrap gap-4 mb-4">
              {[
                { label: "Underweight", color: "bg-blue-500" },
                { label: "Normal", color: "bg-green-500" },
                { label: "Overweight", color: "bg-yellow-500" },
                { label: "Obese", color: "bg-red-500" },
              ].map((l) => (
                <div
                  key={l.label}
                  className="flex items-center gap-1.5 text-xs text-gray-500"
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                  {l.label}
                </div>
              ))}
            </div>

            <div className="w-full overflow-x-auto">
              <BMIChart data={progressData} />
            </div>
          </div>

          {/* History */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
            <h3 className="text-lg font-bold text-black mb-4">
              Progress History
            </h3>

            <div className="w-full overflow-x-auto">
              <ProgressHistoryTable data={progressData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}