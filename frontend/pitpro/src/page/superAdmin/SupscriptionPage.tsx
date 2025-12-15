import { useState, useEffect } from "react"
import Sidebar from "@/components/superAdmin/Sidebar"
import Header from "@/components/superAdmin/Header"
import MobileNav from "@/components/superAdmin/MobileNav"
import SubscriptionTable from "@/components/superAdmin/SubscriptionTable"
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes"
import { useSuperAdminLogout } from "@/hook/superAdmin/superAdminLogoutHook"
import { useDispatch } from "react-redux"
import { deleteToken } from "@/store/slice/tokenSlice"
import { clearSuperAdminData } from "@/store/slice/superAdminSlice"

export default function SubscriptionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("subscription")
  const [isMobile, setIsMobile] = useState(false)

  const { mutate: logout } = useSuperAdminLogout();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkIfMobile()

    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

const handleLogout = () => {
  logout(undefined, {
    onSuccess: () => {
      dispatch(deleteToken());
      dispatch(clearSuperAdminData());
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};


  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
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
          title="Subscription Plans"
          description="Manage your subscription plans and pricing"
          showAddButton = {true}
          url = {FRONTEND_ROUTES.SUPER_ADMIN.ADD_SUBSCRIPTION}
          addButtonLabel="Add new Plan"
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
          showMenuButton={isMobile}
        />
        
        <main className="flex-1 overflow-auto pb-20 lg:pb-0">
          <div className="p-4 sm:p-6">
            <SubscriptionTable />
          </div>
        </main>
      </div>

      {isMobile && (
        <MobileNav 
          activeTab={activeTab} 
          onLogout={handleLogout}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  )
}