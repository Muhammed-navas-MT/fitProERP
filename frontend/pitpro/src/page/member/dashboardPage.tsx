import { Sidebar } from "@/components/member/memberSidebar";
import { Topbar } from "@/components/member/topbar";
import { AttendanceCalendar } from "@/components/shared/attendanceCalendar";
import { AttendanceCard } from "@/components/trainer/dashboard/attendanceCardComponent";
import { BMIGraph } from "@/components/shared/bmiGraph";
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

export default function MemberDashboard() {
  const name = useSelector((state: rootstate) => state.authData.name);

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

  const bmiData = [
    { week: "Week 1", normalweight: 22 },
    { week: "Week 2", normalweight: 22.5 },
    { week: "Week 3", overweight: 25 },
    { week: "Week 4", overweight: 25.2 },
    { week: "Week 5", normalweight: 24 },
    { week: "Week 6", normalweight: 23.5 },
    { week: "Week 7", normalweight: 23 },
    { week: "Week 8", normalweight: 22.8 },
    { week: "Week 9", normalweight: 22.5 },
    { week: "Week 10", normalweight: 22.2 },
  ];

  const workoutSections = [
    {
      category: "Chest",
      exercises: [
        { name: "Incline Dumbbell Press", sets: 4, reps: 12 },
        { name: "Flat Dumbbell Press", sets: 3, reps: 12 },
        { name: "Incline Flys", sets: 3, reps: 12 },
        { name: "Pec Deck", sets: 3, reps: 12 },
      ],
    },
    {
      category: "Triceps",
      exercises: [
        { name: "Skull Crushers", sets: 4, reps: 12 },
        { name: "Rope Extensions", sets: 3, reps: 12 },
        { name: "Straight Bar Pushdowns", sets: 3, reps: 12 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar />

      <div className="md:ml-56">
        <Topbar
          avatar={avatarText}
          title={`Welcome Back, ${name || "Member"}!`}
          subtitle="Ready to crush your fitness goals today."
        />

        <main className="p-4 lg:p-8 space-y-6">
          {/* ================= QUICK STATS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-[#0a0a0a] border border-gray-800 shadow-sm hover:shadow-md">
              <CardContent className="pt-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Days Trained</p>
                    <p className="text-3xl font-bold text-orange-600">18</p>
                    <p className="text-xs text-gray-500">This month</p>
                  </div>
                  <div className="p-3 bg-green-700 rounded-lg">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0a0a0a] border border-gray-800 shadow-sm hover:shadow-md">
              <CardContent className="pt-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Current Weight</p>
                    <p className="text-3xl font-bold text-orange-600">
                      75.2 kg
                    </p>
                    <p className="text-xs text-gray-500">
                      Last measured 4 days ago
                    </p>
                  </div>
                  <div className="p-3 bg-purple-700 rounded-lg">
                    <TrendingDown className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0a0a0a] border border-gray-800 shadow-sm hover:shadow-md">
              <CardContent className="pt-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Today Workout</p>
                    <p className="text-3xl font-bold text-orange-600">Legs</p>
                    <p className="text-xs text-gray-500">Tomorrow</p>
                  </div>
                  <div className="p-3 bg-indigo-700 rounded-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <BMIGraph
            data={bmiData}
            lineColor="#f97316"
            gridColor="#374151"
            title="BMI Trend (10 Weeks)"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
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
