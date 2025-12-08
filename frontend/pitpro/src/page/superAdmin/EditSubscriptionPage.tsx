import { useState, useEffect } from "react"
import Sidebar from "@/components/superAdmin/Sidebar"
import Header from "@/components/superAdmin/Header"
import MobileNav from "@/components/superAdmin/MobileNav"
import {EditSubscriptionForm  } from "@/components/superAdmin/EditSubscription"

export default function EditSubscriptionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkIfMobile()

    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const handleLogout = () => {
    alert("Logged out successfully!")
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      {isMobile && (
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          onLogout={handleLogout}
          isMobile={true}
        />
      )}

      {!isMobile && (
        <div className="fixed left-0 top-0 h-full">
          <Sidebar onLogout={handleLogout} />
        </div>
      )}

      <div className={`${!isMobile ? "lg:ml-64" : ""} flex flex-col min-h-screen`}>
        <Header
          title=" Edit subscription Plan"
          description="Manage your subscription plans and pricing"
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
          showMenuButton={isMobile}
        />
        
        <main className="flex-1 overflow-auto pb-20 lg:pb-0">
          <div className="p-4 sm:p-6">
            <EditSubscriptionForm/>
          </div>
        </main>
      </div>

      {isMobile && (
        <MobileNav 
          onLogout={handleLogout}
        />
      )}
    </div>
  )
}