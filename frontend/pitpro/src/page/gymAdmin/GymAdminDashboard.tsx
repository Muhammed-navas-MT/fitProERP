import { StatsCard } from "@/components/gymAdmin/dashboard/dashboardStateCard"
import { MembershipChart } from "@/components/gymAdmin/dashboard/membershipChart"
import { RevenueChart } from "@/components/gymAdmin/dashboard/revenueChart"
import { TopBar } from "@/components/gymAdmin/topbar"
import { Sidebar } from "@/components/gymAdmin/sidebar"
import { Users, CreditCard, DollarSign, Package } from "lucide-react"
import { RecentActivity } from "@/components/gymAdmin/dashboard/recentActivity"

export default function DashboardPage() {
  const statsData = [
    { title: "Total Members", value: 1250, icon: <Users /> },
    { title: "Active Packages", value: 320, icon: <Package /> },
    { title: "Revenue This Month", value: "$54,000", icon: <DollarSign /> },
    { title: "Payments Pending", value: 12, icon: <CreditCard /> },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Sidebar />
      <TopBar title="Dashboard" subtitle="Welcome back!" showUserMenu={true}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          {statsData.map((stat) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <MembershipChart />
          <RevenueChart />
        </div>

        <div className="mt-6">
          <RecentActivity/>
        </div>
      </TopBar>
    </div>
  )
}
