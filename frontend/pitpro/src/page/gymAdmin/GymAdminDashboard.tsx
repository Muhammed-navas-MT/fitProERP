"use client";

import { StatsCard } from "@/components/gymAdmin/dashboard/dashboardStateCard";
import { MembershipChart } from "@/components/gymAdmin/dashboard/membershipChart";
import { RevenueChart } from "@/components/gymAdmin/dashboard/revenueChart";
import { TopBar } from "@/components/gymAdmin/topbar";
import { Sidebar } from "@/components/gymAdmin/sidebar";
import { Users, Dumbbell, Building2, DollarSign } from "lucide-react";
import { RecentActivity } from "@/components/gymAdmin/dashboard/recentActivity";
import { useDashboardDetail } from "@/hook/gymAdmin/dashboardHook";
import DashboardSkeleton from "@/components/gymAdmin/dashboard/dashboardSkeleton";

export default function DashboardPage() {
  const { data, isLoading } = useDashboardDetail();

  const dashboardData = data?.data;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const statsData = [
    {
      title: "Members",
      total: dashboardData?.totalMembers ?? 0,
      active: dashboardData?.activeMembers ?? 0,
      icon: <Users />,
    },
    {
      title: "Trainers",
      total: dashboardData?.totalTrainers ?? 0,
      active: dashboardData?.activeTrainers ?? 0,
      icon: <Dumbbell />,
    },
    {
      title: "Branches",
      total: dashboardData?.totalBranches ?? 0,
      active: dashboardData?.activeBranches ?? 0,
      icon: <Building2 />,
    },
    {
      title: "Revenue",
      total: dashboardData?.thisMonthRevenue ?? 0,
      icon: <DollarSign />,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <TopBar title="Dashboard" subtitle="Welcome back!" showUserMenu={true}>
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statsData.map((stat) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              total={stat.total}
              active={stat.active}
              icon={stat.icon}
            />
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <MembershipChart data={dashboardData?.memberShipGrowth ?? []} />
          <RevenueChart data={dashboardData?.revenueGrowth ?? []} />
        </div>

        <div className="mt-6">
          <RecentActivity activities={dashboardData?.recentActivities ?? []} />
        </div>
      </TopBar>
    </div>
  );
}
