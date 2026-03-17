import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Sidebar } from "@/components/member/memberSidebar";
import { Topbar } from "@/components/member/topbar";

import { useListDiet, useCreateDietPlan } from "@/hook/member/dietPlanHooks";

import { DietDaySelectorCard } from "@/components/member/dietPlanComponentManagement/dayselectorCard";
import { DietDetail } from "@/components/member/dietPlanComponentManagement/dietDetail";
import { CreateDietButton } from "@/components/member/dietPlanComponentManagement/createDietButton";

import { DietDay, listDietPlanResponseDto } from "@/types/dietType";
import { EmptyDietState } from "@/components/member/dietPlanComponentManagement/emptyDietState";
import { DietPageSkeleton } from "@/components/member/dietPlanComponentManagement/dietPageSkeleton";

export default function DietPlanPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const [selectedDay, setSelectedDay] = useState<string>(today);

  const { data, isLoading } = useListDiet();
  const { mutate: createDiet } = useCreateDietPlan();

  const diet: listDietPlanResponseDto | undefined = data?.data;

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-zinc-950 text-zinc-50">
        <Sidebar />

        <div className="flex-1 flex flex-col md:ml-56">
          <Topbar
            avatar="MN"
            title="Welcome Back, Member!"
            subtitle="Stay consistent with your nutrition."
          />

          <main className="p-6">
            <DietPageSkeleton />
          </main>
        </div>
      </div>
    );
  }

  if (!diet || diet.days.length === 0) {
    return (
      <div className="flex min-h-screen bg-zinc-950 text-zinc-50">
        <Sidebar />

        <div className="flex-1 flex flex-col md:ml-56">
          <Topbar
            avatar="MN"
            title="Welcome Back, Member!"
            subtitle="Stay consistent with your nutrition."
          />

          <main className="flex-1 flex items-center justify-center">
            <EmptyDietState onCreate={createDiet} />
          </main>
        </div>
      </div>
    );
  }

  const selectedDietDay: DietDay =
    diet.days.find((d) => d.day === selectedDay) || diet.days[0];

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-50">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-56">
        <Topbar
          avatar="MN"
          title="Welcome Back, Member!"
          subtitle="Stay consistent with your nutrition."
        />

        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl text-orange-600 font-bold">Diet Plan</h1>

              <p className="text-zinc-400 mt-1">
                7-Day Nutrition Plan • {diet.goalType ?? "Fitness"}
              </p>
            </div>

            <CreateDietButton onClick={() => createDiet()} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
            {diet.days.map((day) => (
              <DietDaySelectorCard
                key={day.day}
                day={day}
                isActive={selectedDay === day.day}
                isToday={today === day.day}
                onClick={() => setSelectedDay(day.day)}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <DietDetail day={selectedDietDay} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
