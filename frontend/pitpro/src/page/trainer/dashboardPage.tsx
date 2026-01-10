import { Sidebar } from "@/components/trainer/trainerSidebar"
import { Header } from "@/components/trainer/trainerHeader"
import { StatCard } from "@/components/trainer/dashboard/statCard"
import { ScheduleItem } from "@/components/trainer/dashboard/scheduleItem"
import { AttendanceCard } from "@/components/trainer/dashboard/attendanceCardComponent"
import { AttendanceCalendar } from "@/components/trainer/dashboard/attendanceComponent"
import { Users, Calendar, IndianRupee } from "lucide-react"
import { useSelector } from "react-redux"
import { rootstate } from "@/store/store"

// Mock data for the attendance calendar
const mockAttendanceData: ("present" | "absent" | "late" | "none")[][] = [
  ["none", "none", "none", "present", "present", "present", "present"],
  ["late", "present", "absent", "present", "absent", "present", "present"],
  ["late", "present", "present", "present", "present", "present", "present"],
  ["late", "present", "present", "present", "present", "present", "none"],
  ["none", "none", "none", "none", "none", "none", "none"],
]

export default function DashboardPage() {
  const name = useSelector((state:rootstate)=>state.authData.name);
  const avatarText = name
  ?.split(" ")
  .map(word => word[0])
  .join("")
  .toUpperCase()
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Sidebar />

      <div className="lg:pl-[220px]">
        <Header title="Dashboard" subtitle="Manage training sessions and member performance" avatar={avatarText}/>

        <main className="p-4 lg:p-6 pb-20 lg:pb-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-purple-400 mb-2">Welcome Back, Trainer!</h1>
            <p className="text-gray-400">{"Here's what's happening with your training today."}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard title="Active Clients" value="24" icon={Users} />
            <StatCard title="Today's Sessions" value="2/3" icon={Calendar} iconColor="text-orange-400" />
            <StatCard title="Monthly Earnings" value="₹ 25,000" icon={IndianRupee} iconColor="text-orange-400" />
          </div>

          {/* Schedule and Attendance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Today's Schedule */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <h3 className="text-white font-semibold text-lg mb-4">{"Today's Schedule"}</h3>
              <div className="space-y-3">
                <ScheduleItem name="Sarah Johnson" type="Personal Training" time="06:00 AM" />
                <ScheduleItem name="Mike Chen" type="Personal Training" time="09:00 AM" />
              </div>
            </div>

            {/* Today's Attendance */}
            <AttendanceCard status="Not Checked In" currentTime="9:26:28 PM" />
          </div>

          {/* Monthly Attendance Calendar */}
          <AttendanceCalendar month="October" attendanceData={mockAttendanceData} />
        </main>
      </div>
    </div>
  )
}
