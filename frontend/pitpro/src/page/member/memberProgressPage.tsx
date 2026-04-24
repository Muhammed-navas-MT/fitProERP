import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  Scale,
  Activity,
  TrendingDown,
  TrendingUp,
  Percent,
  Dumbbell,
  Plus,
  Target,
  CheckCircle2,
  PartyPopper,
  Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/member/memberSidebar";
import { Topbar } from "@/components/member/topbar";
import {
  getBMICategoryBg,
  getBMICategoryColor,
  IMonthlyProgressReport,
  ProgressType,
} from "@/types/member/progressTypes";
import { CreateProgressModal } from "@/components/member/progressComponents/createProgressModal";
import { BMIChart } from "@/components/member/progressComponents/BMIChart";
import { ProgressHistoryTable } from "@/components/member/progressComponents/progressHistoryTable";
import { rootstate } from "@/store/store";
import {
  useListProgress,
  useListProgressGraphData,
} from "@/hook/member/progressHook";
import { Button } from "@/components/ui/button";

export default function ProgressPage() {
  const [page, setPage] = useState(1);
  const [openAddModal, setOpenAddModal] = useState(false);

  const { name, profileImg } = useSelector(
    (state: rootstate) => state.authData,
  );

  const avatarText = useMemo(() => {
    return name
      ?.split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [name]);

  const { data, isLoading, isError, error } = useListProgress(page);
  const { data: graphData } = useListProgressGraphData();

  const progressGraphData: IMonthlyProgressReport[] = graphData?.data ?? [];
  const progressTableData: ProgressType[] = data?.data?.progress ?? [];

  const total = data?.data?.total ?? 0;
  const totalPages = data?.data?.totalPages ?? 1;

  const latestProgress = data?.data?.latestProgress;
  const monthlyStatus = data?.data?.monthlyStatus;
  const goalWeightStatus = data?.data?.goalWeightStatus;

  const hasAddedThisMonth = monthlyStatus?.hasAddedThisMonth ?? false;
  const currentMonth = monthlyStatus?.currentMonth ?? "";
  const goalAchieved = goalWeightStatus?.achieved ?? false;

  const sortedData = [...progressTableData].sort(
    (a, b) =>
      new Date(b.progressDate).getTime() - new Date(a.progressDate).getTime(),
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
      value: latest ? latest.bmi.toFixed(1) : "—",
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
    <div className="min-h-screen bg-black text-white">
      <Sidebar />

      <div className="md:ml-56">
        <Topbar
          avatar={avatarText}
          title="Progress"
          subtitle="Track your body metrics and fitness changes."
          profileImg={profileImg}
        />

        <main className="mx-auto w-full max-w-[1400px] space-y-6 p-4 lg:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-orange-700">
                BMI & Body Progress
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                {total} records tracked
              </p>
            </div>

            <div className="self-start md:self-auto">
              {!hasAddedThisMonth ? (
                <Button
                  onClick={() => setOpenAddModal(true)}
                  className="rounded-xl bg-orange-700 px-5 py-2 font-semibold text-white hover:bg-orange-600"
                >
                  <Plus size={18} />
                  Add Progress
                </Button>
              ) : (
                <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-zinc-300">
                  <Lock size={16} className="text-orange-500" />
                  Progress already added for {currentMonth}
                </div>
              )}
            </div>
          </div>

          <CreateProgressModal
            page={page}
            isOpen={openAddModal}
            onClose={() => setOpenAddModal(false)}
          />

          <AnimatePresence>
            {goalAchieved && (
              <motion.div
                initial={{ opacity: 0, y: -18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/15 via-green-500/10 to-orange-500/10 p-5"
              >
                <motion.div
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.2,
                  }}
                  className="absolute inset-0 bg-white/[0.03]"
                />

                <div className="relative z-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-emerald-500/20 p-3">
                      <PartyPopper className="h-6 w-6 text-emerald-400" />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-emerald-300">
                        Target weight achieved 🎉
                      </h3>
                      <p className="mt-1 text-sm text-zinc-200">
                        Great job. You reached your target weight of{" "}
                        <span className="font-semibold text-white">
                          {goalWeightStatus?.targetWeight?.value}{" "}
                          {goalWeightStatus?.targetWeight?.unit}
                        </span>
                        .
                      </p>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                    className="hidden md:block"
                  >
                    <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isLoading ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-center text-zinc-400">
              Loading progress...
            </div>
          ) : isError ? (
            <div className="rounded-2xl border border-red-800 bg-zinc-950 p-6 text-center text-red-400">
              {(error as Error)?.message || "Failed to load progress"}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-zinc-400">
                        Monthly Progress Status
                      </p>
                      <p className="mt-2 text-lg font-bold text-white">
                        {hasAddedThisMonth
                          ? `Already added for ${currentMonth}`
                          : `Not added for ${currentMonth}`}
                      </p>
                      <p className="mt-2 text-sm text-zinc-400">
                        {hasAddedThisMonth
                          ? "You already submitted your monthly progress. You can add the next one next month."
                          : "You have not added this month’s progress yet."}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-zinc-900 p-3">
                      {hasAddedThisMonth ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      ) : (
                        <Lock className="h-5 w-5 text-orange-500" />
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-zinc-400">
                        Goal Weight Status
                      </p>
                      <p className="mt-2 text-lg font-bold text-white">
                        {goalWeightStatus?.targetWeight
                          ? `${goalWeightStatus.targetWeight.value} ${goalWeightStatus.targetWeight.unit}`
                          : "No target set"}
                      </p>
                      <p
                        className={`mt-2 text-sm ${
                          goalAchieved
                            ? "text-emerald-400"
                            : goalWeightStatus?.message?.includes("lose")
                              ? "text-orange-400"
                              : goalWeightStatus?.message?.includes("gain")
                                ? "text-blue-400"
                                : "text-zinc-400"
                        }`}
                      >
                        {goalWeightStatus?.message ||
                          "Set a target weight in your profile to track progress."}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-zinc-900 p-3">
                      <Target
                        className={`h-5 w-5 ${
                          goalAchieved ? "text-emerald-400" : "text-orange-500"
                        }`}
                      />
                    </div>
                  </div>

                  {goalWeightStatus?.targetWeight &&
                    latestProgress?.currentWeight && (
                      <div className="mt-4">
                        <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
                          <span>Current</span>
                          <span>Target</span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: goalAchieved
                                ? "100%"
                                : `${Math.max(
                                    8,
                                    Math.min(
                                      100,
                                      (goalWeightStatus.targetWeight.value /
                                        latestProgress.currentWeight.value) *
                                        100,
                                    ),
                                  )}%`,
                            }}
                            transition={{ duration: 0.8 }}
                            className={`h-full rounded-full ${
                              goalAchieved ? "bg-emerald-500" : "bg-orange-500"
                            }`}
                          />
                        </div>
                      </div>
                    )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-zinc-400">
                        Latest Progress Check
                      </p>
                      <p className="mt-2 text-lg font-bold text-white">
                        {latestProgress?.progressDate
                          ? new Date(
                              latestProgress.progressDate,
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "No progress yet"}
                      </p>
                      <p className="mt-2 text-sm text-zinc-400">
                        {latestProgress?.bmiCategory
                          ? `Your current BMI category is ${latestProgress.bmiCategory}.`
                          : "Add your first progress record to start tracking."}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-zinc-900 p-3">
                      <Activity className="h-5 w-5 text-orange-500" />
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-sm sm:p-6">
                <h3 className="mb-4 text-lg font-bold text-orange-700">
                  BMI Trend
                </h3>

                <div className="mb-4 flex flex-wrap gap-4">
                  {[
                    { label: "Underweight", color: "bg-blue-500" },
                    { label: "Normal", color: "bg-green-500" },
                    { label: "Overweight", color: "bg-yellow-500" },
                    { label: "Obese", color: "bg-red-500" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-1.5 text-xs text-zinc-400"
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${item.color}`}
                      />
                      {item.label}
                    </div>
                  ))}
                </div>

                <div className="w-full overflow-x-auto rounded-xl bg-black/30 p-2">
                  <BMIChart data={progressGraphData} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wider text-zinc-400">
                          {stat.label}
                        </p>

                        <p className="mt-1 break-words text-2xl font-black text-white">
                          {stat.value}
                        </p>

                        {stat.change !== undefined && stat.change !== 0 && (
                          <div
                            className={`mt-2 flex items-center gap-1 text-xs font-medium ${
                              stat.change < 0
                                ? "text-green-400"
                                : "text-orange-400"
                            }`}
                          >
                            {stat.change < 0 ? (
                              <TrendingDown size={12} />
                            ) : (
                              <TrendingUp size={12} />
                            )}
                            {Math.abs(stat.change).toFixed(1)}{" "}
                            {stat.suffix || ""}
                          </div>
                        )}

                        {stat.badge && (
                          <span
                            className={`mt-2 inline-block rounded-full border px-2 py-1 text-[11px] font-semibold ${getBMICategoryBg(
                              stat.badge,
                            )} ${getBMICategoryColor(stat.badge)}`}
                          >
                            {stat.badge}
                          </span>
                        )}
                      </div>

                      <div className="shrink-0 rounded-2xl bg-zinc-900 p-3">
                        <stat.icon size={20} className="text-orange-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-sm sm:p-6">
                <h3 className="mb-4 text-lg font-bold text-orange-700">
                  Progress History
                </h3>

                <div className="w-full overflow-x-auto rounded-xl">
                  <ProgressHistoryTable data={sortedData} />
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-zinc-400">
                  <p>
                    Showing {(page - 1) * 5 + 1} - {Math.min(page * 5, total)}{" "}
                    of {total}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage((prev) => prev - 1)}
                      className="rounded bg-zinc-800 px-3 py-1 text-white disabled:opacity-40"
                    >
                      Prev
                    </button>

                    <span>
                      Page {page} / {totalPages}
                    </span>

                    <button
                      disabled={page === totalPages || totalPages === 0}
                      onClick={() => setPage((prev) => prev + 1)}
                      className="rounded bg-zinc-800 px-3 py-1 text-white disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
