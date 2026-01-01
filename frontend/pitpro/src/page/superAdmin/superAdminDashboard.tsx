"use client"

import { useState } from "react"
import { Dumbbell, Building2, TrendingUp } from "lucide-react"
import Sidebar from "@/components/superAdmin/Sidebar"
import Header from "@/components/superAdmin/Header"
import StatCard from "@/components/superAdmin/dashboard/statCard"

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
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
        {/* Header */}
        <Header
          title="Dashboard"
          description="Welcome to FitPro ERP Super Admin Panel"
          showMenuButton={true}
          onMenuToggle={toggleSidebar}
        />

        {/* Dashboard Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <StatCard
              title="Total Gyms"
              value="184"
              change="+12.5% from last month"
              icon={Dumbbell}
              iconColor="text-blue-500"
            />
            <StatCard
              title="Total Branches"
              value="225"
              change="+12.5% from last month"
              icon={Building2}
              iconColor="text-blue-500"
            />
            <StatCard
              title="Monthly Revenue"
              value="₹67,000"
              change="+21.5% from last month"
              icon={TrendingUp}
              iconColor="text-blue-500"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {/* Revenue Overview Chart */}
            <div className="bg-[#1a1f24] border border-gray-800 rounded-lg p-4 sm:p-6">
              <h3 className="text-white font-semibold text-lg mb-4">Revenue Overview</h3>
              <div className="relative h-64 sm:h-80">
                <svg className="w-full h-full" viewBox="0 0 600 300" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  {/* Grid lines */}
                  <line x1="0" y1="50" x2="600" y2="50" stroke="#374151" strokeWidth="0.5" />
                  <line x1="0" y1="100" x2="600" y2="100" stroke="#374151" strokeWidth="0.5" />
                  <line x1="0" y1="150" x2="600" y2="150" stroke="#374151" strokeWidth="0.5" />
                  <line x1="0" y1="200" x2="600" y2="200" stroke="#374151" strokeWidth="0.5" />
                  <line x1="0" y1="250" x2="600" y2="250" stroke="#374151" strokeWidth="0.5" />

                  {/* Area chart */}
                  <path
                    d="M 0 180 Q 50 160, 100 170 T 200 150 T 300 140 T 400 130 T 500 100 T 600 90 L 600 300 L 0 300 Z"
                    fill="url(#revenueGradient)"
                  />

                  {/* Line */}
                  <path
                    d="M 0 180 Q 50 160, 100 170 T 200 150 T 300 140 T 400 130 T 500 100 T 600 90"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />

                  {/* Y-axis labels */}
                  <text x="10" y="30" fill="#9ca3af" fontSize="12">
                    80000
                  </text>
                  <text x="10" y="80" fill="#9ca3af" fontSize="12">
                    60000
                  </text>
                  <text x="10" y="130" fill="#9ca3af" fontSize="12">
                    40000
                  </text>
                  <text x="10" y="180" fill="#9ca3af" fontSize="12">
                    20000
                  </text>
                  <text x="10" y="230" fill="#9ca3af" fontSize="12">
                    0
                  </text>

                  <text x="20" y="290" fill="#9ca3af" fontSize="12">
                    Jan
                  </text>
                  <text x="120" y="290" fill="#9ca3af" fontSize="12">
                    Feb
                  </text>
                  <text x="220" y="290" fill="#9ca3af" fontSize="12">
                    Mar  
                  </text>
                  <text x="320" y="290" fill="#9ca3af" fontSize="12">
                    Apr
                  </text>
                  <text x="420" y="290" fill="#9ca3af" fontSize="12">
                    May
                  </text>
                  <text x="520" y="290" fill="#9ca3af" fontSize="12">
                    Jun
                  </text>
                </svg>
              </div>
            </div>

            {/* Gym Growth Chart */}
            <div className="bg-[#1a1f24] border border-blue-500 rounded-lg p-4 sm:p-6">
              <h3 className="text-white font-semibold text-lg mb-4">Gym Growth</h3>
              <div className="relative h-64 sm:h-80">
                <svg className="w-full h-full" viewBox="0 0 600 300" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="60" x2="600" y2="60" stroke="#374151" strokeWidth="0.5" />
                  <line x1="0" y1="120" x2="600" y2="120" stroke="#374151" strokeWidth="0.5" />
                  <line x1="0" y1="180" x2="600" y2="180" stroke="#374151" strokeWidth="0.5" />
                  <line x1="0" y1="240" x2="600" y2="240" stroke="#374151" strokeWidth="0.5" />

                  {/* Line chart */}
                  <path
                    d="M 80 160 L 180 130 L 280 110 L 380 80 L 480 60 L 580 40"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                  />

                  {/* Data points */}
                  <circle cx="80" cy="160" r="4" fill="#8b5cf6" />
                  <circle cx="180" cy="130" r="4" fill="#8b5cf6" />
                  <circle cx="280" cy="110" r="4" fill="#8b5cf6" />
                  <circle cx="380" cy="80" r="4" fill="#8b5cf6" />
                  <circle cx="480" cy="60" r="4" fill="#8b5cf6" />
                  <circle cx="580" cy="40" r="4" fill="#8b5cf6" />

                  {/* Y-axis labels */}
                  <text x="10" y="30" fill="#9ca3af" fontSize="12">
                    200
                  </text>
                  <text x="10" y="90" fill="#9ca3af" fontSize="12">
                    150
                  </text>
                  <text x="10" y="150" fill="#9ca3af" fontSize="12">
                    100
                  </text>
                  <text x="10" y="210" fill="#9ca3af" fontSize="12">
                    50
                  </text>
                  <text x="10" y="270" fill="#9ca3af" fontSize="12">
                    0
                  </text>

                  {/* X-axis labels */}
                  <text x="60" y="290" fill="#9ca3af" fontSize="12">
                    Jan
                  </text>
                  <text x="160" y="290" fill="#9ca3af" fontSize="12">
                    Feb
                  </text>
                  <text x="260" y="290" fill="#9ca3af" fontSize="12">
                    Mar
                  </text>
                  <text x="360" y="290" fill="#9ca3af" fontSize="12">
                    Apr
                  </text>
                  <text x="460" y="290" fill="#9ca3af" fontSize="12">
                    May
                  </text>
                  <text x="560" y="290" fill="#9ca3af" fontSize="12">
                    Jun
                  </text>

                  {/* Tooltip on hover point */}
                  <text x="160" y="120" fill="#8b5cf6" fontSize="11">
                    gyms - 135
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
