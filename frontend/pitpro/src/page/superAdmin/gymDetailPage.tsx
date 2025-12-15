"use client"

import { useState } from "react"
import Sidebar from "@/components/superAdmin/Sidebar"
import Header from "@/components/superAdmin/Header"
import MobileNav from "@/components/superAdmin/MobileNav"
import GymDetailHeader from "@/components/superAdmin/gymDetailHeader"
import StatCard from "../../components/superAdmin/stateCard"
import OwnerInfoCard from "@/components/superAdmin/ownerInfoCard"
import SubscriptionCard from "@/components/superAdmin/subscriptionCard"

// Sample gym data - in a real app, this would be fetched based on the ID
const gymData = {
  id: "1",
  name: "PowerFit Gym",
  status: "active" as const,
  totalMembers: 986,
  totalBranches: 3,
  totalEmployees: 37,
  owner: {
    name: "John Smith",
    email: "john@powerfit.com",
    phone: "+1 (555) 123-4567",
    address: "123 Fitness Street, New York, NY 10001",
  },
  subscription: {
    currentPlan: "Professional",
    monthlyCost: "35,000",
    memberSince: "2024-01-15",
  },
}

export default function GymDetailPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleLogout = () => {
    console.log("Logging out...")
  }

  const handleBack = () => {
  }

  const handleBlock = () => {
    console.log("Block gym:", gymData.id)
  }

  return (
    <div className="flex h-screen bg-[#0a0b0d] overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar onLogout={handleLogout} isOpen={true} />
      </div>

      {/* Mobile Sidebar */}
      <Sidebar onLogout={handleLogout} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} isMobile={true} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="" description="" showMenuButton={true} onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          {/* Gym Detail Header */}
          <GymDetailHeader
            gymName={gymData.name}
            gymId={gymData.id}
            status={gymData.status}
            onBack={handleBack}
            onBlock={handleBlock}
          />

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard title="Total Members" value={gymData.totalMembers} />
              <StatCard title="Total Branches" value={gymData.totalBranches} />
              <StatCard title="Total Employees" value={gymData.totalEmployees} />
            </div>

            {/* Owner and Subscription Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <OwnerInfoCard
                name={gymData.owner.name}
                email={gymData.owner.email}
                phone={gymData.owner.phone}
                address={gymData.owner.address}
              />
              <SubscriptionCard
                currentPlan={gymData.subscription.currentPlan}
                monthlyCost={gymData.subscription.monthlyCost}
                memberSince={gymData.subscription.memberSince}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav activeTab="gyms" onLogout={handleLogout} />
    </div>
  )
}
