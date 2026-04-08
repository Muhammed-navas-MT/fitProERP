"use client";

import { useState } from "react";
import { Building2, Dumbbell, TrendingUp } from "lucide-react";
import Sidebar from "@/components/superAdmin/Sidebar";
import Header from "@/components/superAdmin/Header";
import StatCard from "@/components/superAdmin/dashboard/statCard";
import RevenueOverviewChart from "@/components/superAdmin/dashboard/revenueOverviewChart";
import GymGrowthChart from "@/components/superAdmin/dashboard/gymGrowthChart";
import { useDashboardDetail } from "@/hook/superAdmin/dashboardHooks";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatPercentage = (value: number) => {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}% from last month`;
};

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const { data, isLoading } = useDashboardDetail();
  console.log(data);

  const dashboardData = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0d10] flex items-center justify-center text-white">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0d10] flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar isOpen={true} isMobile={false} />
      </div>

      {/* Mobile Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} isMobile={true} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header
          title="Dashboard"
          description="Welcome to FitPro ERP Super Admin Panel"
          showMenuButton={true}
          onMenuToggle={toggleSidebar}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <StatCard
              title="Total Gyms"
              value={dashboardData?.summary.totalGyms ?? 0}
              change={formatPercentage(dashboardData?.summary.gymGrowthPercentage ?? 0)}
              icon={Dumbbell}
              iconColor="text-blue-500"
            />

            <StatCard
              title="Total Branches"
              value={dashboardData?.summary.totalBranches ?? 0}
              change={formatPercentage(dashboardData?.summary.branchGrowthPercentage ?? 0)}
              icon={Building2}
              iconColor="text-cyan-500"
            />

            <StatCard
              title="Monthly Revenue"
              value={formatCurrency(dashboardData?.summary.monthlyRevenue ?? 0)}
              change={formatPercentage(dashboardData?.summary.revenueGrowthPercentage ?? 0)}
              icon={TrendingUp}
              iconColor="text-emerald-500"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            <RevenueOverviewChart data={dashboardData?.revenueOverview ?? []} />
            <GymGrowthChart data={dashboardData?.gymGrowth ?? []} />
          </div>
        </main>
      </div>
    </div>
  );
}