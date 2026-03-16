import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreateWorkoutButton } from "@/components/member/workoutPlanCompoents/createWorkoutButton";
import { DaySelectorCard } from "@/components/member/workoutPlanCompoents/daySelectorCard";
import { WorkoutDetail } from "@/components/member/workoutPlanCompoents/workoutDetail";
import { Sidebar } from "@/components/member/memberSidebar";
import { Topbar } from "@/components/member/topbar";
import { useCreateWorkoutPlan, useListWorkout } from "@/hook/member/workoutPlanHooks";

interface Exercise {
  name: string;
  equipment: string;
  sets: string;
  reps: string;
  rest: string;
}

interface WorkoutDay {
  dayOfWeek: string;
  targetMuscles: string[];
  exercises: Exercise[];
}

const WorkoutSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 w-40 bg-zinc-800 rounded"></div>
      <div className="h-24 bg-zinc-800 rounded"></div>
      <div className="h-24 bg-zinc-800 rounded"></div>
      <div className="h-24 bg-zinc-800 rounded"></div>
    </div>
  );
};

export default function WorkoutPage() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const [selectedDay, setSelectedDay] = useState<string>(today);


  const {mutate:createWorkout} = useCreateWorkoutPlan();
  const { data, isLoading, isError } = useListWorkout();
  const workout = data?.data ?? {};
  console.log(workout)

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-zinc-950 text-zinc-50">
        <Sidebar />

        <div className="flex-1 flex flex-col md:ml-56">
          <Topbar
            avatar={"MN"}
            title={`Welcome Back, "Member"!`}
            subtitle="Ready to crush your fitness goals today."
          />

          <main className="p-6">
            <WorkoutSkeleton />
          </main>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Failed to load workout plan
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="flex min-h-screen bg-zinc-950 text-zinc-50">
        <Sidebar />

        <div className="flex-1 flex flex-col md:ml-56">
          <Topbar
            avatar={"MN"}
            title={`Welcome Back, "Member"!`}
            subtitle="Ready to crush your fitness goals today."
          />

          <main className="flex items-center justify-center flex-1">
            <div className="text-center space-y-4">
              <p className="text-zinc-400 text-lg">
                No Workout Plan Found
              </p>

              <CreateWorkoutButton />
            </div>
          </main>
        </div>
      </div>
    );
  }

  const selectedWorkout =
    workout.days.find((d: WorkoutDay) => d.dayOfWeek === selectedDay) ||
    workout.days[0];

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-50">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-56">
        <Topbar
          avatar={"MN"}
          title={`Welcome Back, "Member"!`}
          subtitle="Ready to crush your fitness goals today."
        />

        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl text-orange-600 font-bold tracking-tight">
                Training Plan
              </h1>

              <p className="text-zinc-400 mt-1">
                7-Day Gym Workout Plan • Hypertrophy
              </p>
            </div>

            <CreateWorkoutButton onClick={createWorkout} />
          </div>

          {/* Day Selector */}

          <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
            {workout.days.map((day: WorkoutDay) => (
              <DaySelectorCard
                key={day.dayOfWeek}
                day={day}
                isActive={selectedDay === day.dayOfWeek}
                isToday={today === day.dayOfWeek}
                onClick={() => setSelectedDay(day.dayOfWeek)}
              />
            ))}
          </div>

          {/* Workout Detail */}

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <WorkoutDetail day={selectedWorkout} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}