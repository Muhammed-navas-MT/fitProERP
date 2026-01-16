import { Sidebar } from "@/components/trainer/trainerSidebar";
import { Header } from "@/components/trainer/trainerHeader";
import { StatCard } from "@/components/trainer/dashboard/statCard";
import { ScheduleItem } from "@/components/trainer/dashboard/scheduleItem";
import { AttendanceCard } from "@/components/trainer/dashboard/attendanceCardComponent";
import { AttendanceCalendar } from "@/components/trainer/dashboard/attendanceComponent";
import { Users, Calendar, IndianRupee } from "lucide-react";
import {
  useMarkAttendance,
  useUpdateAttendance,
  useTodayAttendance,
  useCurrentMonthAttendance,
} from "@/hook/trainer/attendanceHook";
import { useSelector } from "react-redux";
import { rootstate } from "@/store/store";
import { toast } from "sonner";
import { mapAttendanceToCalendar, UIStatus } from "@/utils/mapAttendanceToCalendar";
import { GetAttendanceType } from "@/types/attendanceType";

export default function DashboardPage() {
  const name = useSelector((state: rootstate) => state.authData.name);

  const avatarText = name
    ?.split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const { data: todayAttendanceRes, isLoading: isTodayAttendanceLoading, refetch } =
    useTodayAttendance();

  const { mutate: markAttendance, isPending: isCheckInPending } = useMarkAttendance();
  const { mutate: updateAttendance, isPending: isCheckOutPending } = useUpdateAttendance();

  const { data: currentMonthAttendance, isLoading: isCurrentMonthLoading,refetch:refetchCurrentMonathAttendance } = useCurrentMonthAttendance();

  const attendance: GetAttendanceType | undefined = todayAttendanceRes?.data ?? todayAttendanceRes;

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
        refetchCurrentMonathAttendance()
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
    calendarData = mapAttendanceToCalendar(currentMonthAttendance.data, currentYear, currentMonth);
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Sidebar />

      <div className="lg:pl-[220px]">
        <Header
          title="Dashboard"
          subtitle="Manage training sessions and member performance"
          avatar={avatarText}
        />

        <main className="p-4 lg:p-6 pb-20 lg:pb-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-purple-400 mb-2">
              Welcome Back, Trainer!
            </h1>
            <p className="text-gray-400">
              {"Here's what's happening with your training today."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard title="Active Clients" value="24" icon={Users} />
            <StatCard title="Today's Sessions" value="2/3" icon={Calendar} />
            <StatCard
              title="Monthly Earnings"
              value="₹ 25,000"
              icon={IndianRupee}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <h3 className="text-white font-semibold text-lg mb-4">
                {"Today's Schedule"}
              </h3>
              <div className="space-y-3">
                <ScheduleItem
                  name="Sarah Johnson"
                  type="Personal Training"
                  time="06:00 AM"
                />
                <ScheduleItem
                  name="Mike Chen"
                  type="Personal Training"
                  time="09:00 AM"
                />
              </div>
            </div>

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
            />
          </div>

          <AttendanceCalendar
            month={monthName}
            attendanceData={isCurrentMonthLoading ? [] : calendarData}
          />
        </main>
      </div>
    </div>
  );
}
