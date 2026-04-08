"use client";

import { Sidebar } from "@/components/member/memberSidebar";
import { Topbar } from "@/components/member/topbar";
import { AttendanceCalendar } from "@/components/shared/attendanceCalendar";
import { AttendanceCard } from "@/components/trainer/dashboard/attendanceCardComponent";
import { TodaysWorkout } from "@/components/shared/todaysWorkout";
import { Card, CardContent } from "@/components/ui/card";
import { rootstate } from "@/store/store";
import { TrendingDown, Activity, Target } from "lucide-react";
import { useSelector } from "react-redux";
import {
  useCurrentMonthAttendance,
  useMarkAttendance,
  useTodayAttendance,
  useUpdateAttendance,
} from "@/hook/member/attendanceHooks";
import { toast } from "sonner";
import {
  mapAttendanceToCalendar,
  UIStatus,
} from "@/utils/mapAttendanceToCalendar";
import { GetAttendanceType } from "@/types/attendanceType";
import { useDashboardDetail } from "@/hook/member/dashboardHook";
import { BMIChart } from "@/components/member/progressComponents/BMIChart";
import MemberDashboardSkeleton from "@/components/member/dashboard/dashboardSkeleton";

export interface Exercise {
  name?: string;
  equipment?: string;
  sets?: string;
  reps?: string;
  rest?: string;
}

export default function MemberDashboard() {
  const name = useSelector((state: rootstate) => state.authData.name);

  const { data, isLoading: isDashboardLoading } = useDashboardDetail();

  const dashboardData = data?.data ?? data;

  const avatarText = name
    ?.split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const {
    data: todayAttendanceRes,
    isLoading: isTodayAttendanceLoading,
    refetch,
  } = useTodayAttendance();

  const { mutate: markAttendance, isPending: isCheckInPending } =
    useMarkAttendance();
  const { mutate: updateAttendance, isPending: isCheckOutPending } =
    useUpdateAttendance();

  const {
    data: currentMonthAttendance,
    isLoading: isCurrentMonthLoading,
    refetch: refetchCurrentMonathAttendance,
  } = useCurrentMonthAttendance();

  if (isDashboardLoading) {
    return <MemberDashboardSkeleton />;
  }

  const attendance: GetAttendanceType | undefined =
    todayAttendanceRes?.data ?? todayAttendanceRes;

  const isCheckedIn = !!attendance?.checkInTime;
  const isCheckedOut = !!attendance?.checkOutTime;

  const attendanceStatusText = isTodayAttendanceLoading
    ? "Loading..."
    : isCheckedOut
      ? "Checked Out"
      : isCheckedIn
        ? "Checked In"
        : "Not Checked In";

  const handleCheckIn = () => {
    markAttendance(undefined, {
      onSuccess: (res) => {
        toast.success(res?.data?.message || "Attendance Checked In");
        refetch();
      },
      onError: (err) => {
        toast.error(err.message || "Error while checking in!");
      },
    });
  };

  const handleCheckOut = () => {
    if (!attendance?._id) return;

    updateAttendance(attendance._id, {
      onSuccess: (res) => {
        toast.success(res?.data?.message || "Attendance Checked Out");
        refetch();
        refetchCurrentMonathAttendance();
      },
      onError: (err) => {
        toast.error(err.message || "Error while checking out!");
      },
    });
  };

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const monthName = now.toLocaleString("default", { month: "long" });

  let calendarData: UIStatus[][] = [];
  if (currentMonthAttendance?.data) {
    calendarData = mapAttendanceToCalendar(
      currentMonthAttendance.data,
      currentYear,
      currentMonth
    );
  }

  const todayWorkoutLabel = dashboardData?.todayWorkout?.targetMuscles?.length
    ? dashboardData.todayWorkout.targetMuscles.join(", ")
    : "No Workout";

  const exercises: Exercise[] = dashboardData?.todayWorkout?.exercises ?? [];
  const mid = Math.ceil(exercises.length / 2);

  const firstHalf = exercises.slice(0, mid);
  const secondHalf = exercises.slice(mid);

  const workoutSections = [
    {
      category: dashboardData?.todayWorkout?.targetMuscles?.[0] || "",
      exercises: firstHalf.map((exercise: Exercise) => ({
        name: exercise.name || "Unnamed Exercise",
        sets: exercise.sets || "-",
        reps: exercise.reps || "-",
      })),
    },
    {
      category: dashboardData?.todayWorkout?.targetMuscles?.[1] || "",
      exercises: secondHalf.map((exercise: Exercise) => ({
        name: exercise.name || "Unnamed Exercise",
        sets: exercise.sets || "-",
        reps: exercise.reps || "-",
      })),
    },
  ].filter((section) => section.category || section.exercises.length > 0);

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar />

      <div className="md:ml-56">
        <Topbar
          avatar={avatarText}
          title={`Welcome Back, ${name || "Member"}!`}
          subtitle="Ready to crush your fitness goals today."
        />

        <main className="space-y-6 p-4 lg:p-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="border border-gray-800 bg-[#0a0a0a] shadow-sm hover:shadow-md">
              <CardContent className="pt-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Days Trained</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {dashboardData?.daysTrained ?? 0}
                    </p>
                    <p className="text-xs text-gray-500">Overall trained days</p>
                  </div>
                  <div className="rounded-lg bg-green-700 p-3">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-800 bg-[#0a0a0a] shadow-sm hover:shadow-md">
              <CardContent className="pt-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Current Weight</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {dashboardData?.currentWeight
                        ? `${dashboardData.currentWeight.value} ${dashboardData.currentWeight.unit}`
                        : "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Latest recorded weight
                    </p>
                  </div>
                  <div className="rounded-lg bg-purple-700 p-3">
                    <TrendingDown className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-800 bg-[#0a0a0a] shadow-sm hover:shadow-md">
              <CardContent className="pt-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Today Workout</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {todayWorkoutLabel}
                    </p>
                    <p className="text-xs text-gray-500">
                      {dashboardData?.todayWorkout?.dayOfWeek || "No plan for today"}
                    </p>
                  </div>
                  <div className="rounded-lg bg-indigo-700 p-3">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border border-gray-800 bg-[#0a0a0a] shadow-sm">
            <CardContent className="pt-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-orange-600">
                  BMI Progress
                </h2>
                <p className="text-sm text-gray-400">
                  Monthly BMI report based on your progress data
                </p>
              </div>

              <BMIChart data={dashboardData?.progressGraphData ?? []} />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
            <AttendanceCard
              status={attendanceStatusText}
              checkInTime={
                attendance?.checkInTime
                  ? new Date(attendance.checkInTime).toLocaleTimeString()
                  : undefined
              }
              checkOutTime={
                attendance?.checkOutTime
                  ? new Date(attendance.checkOutTime).toLocaleTimeString()
                  : undefined
              }
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
              isCheckInLoading={isCheckInPending}
              isCheckOutLoading={isCheckOutPending}
              disabledCheckIn={isCheckedIn}
              disabledCheckOut={!isCheckedIn || isCheckedOut}
              titleColor="text-orange-600"
              backgroundColor="bg-[#0a0a0a]"
              innerBackgroundColor="bg-zinc-900"
            />

            <AttendanceCalendar
              month={monthName}
              attendanceData={isCurrentMonthLoading ? [] : calendarData}
              cardBgColor="bg-[#0a0a0a]"
              titleColor="text-orange-600"
            />
          </div>

          <TodaysWorkout sections={workoutSections} />
        </main>
      </div>
    </div>
  );
}
