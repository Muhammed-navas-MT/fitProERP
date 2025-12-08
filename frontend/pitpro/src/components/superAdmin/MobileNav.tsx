import { 
  LayoutDashboard, 
  BarChart3, 
  CreditCard, 
  Building2, 
  Wallet,
  LogOut
} from "lucide-react"

interface MobileNavProps {
  activeTab?: string
  onLogout?: () => void
  onTabChange?: (tabId: string) => void
}

export default function MobileNav({ activeTab = "dashboard", onLogout, onTabChange }: MobileNavProps) {
  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "subscription", icon: CreditCard, label: "Subscription" },
    { id: "gyms", icon: Building2, label: "Gyms" },
    { id: "payments", icon: Wallet, label: "Payments" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#111418] border-t border-gray-800 z-40 lg:hidden">
      <div className="flex justify-around items-center py-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange && onTabChange(item.id)}
            className={`
              flex flex-col items-center justify-center p-2 rounded-lg transition
              ${activeTab === item.id 
                ? "text-blue-500" 
                : "text-gray-400 hover:text-white"
              }
            `}
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
        {onLogout && (
          <button
            onClick={onLogout}
            className="flex flex-col items-center justify-center p-2 rounded-lg text-gray-400 hover:text-red-400 transition"
          >
            <LogOut size={20} />
            <span className="text-xs mt-1">Logout</span>
          </button>
        )}
      </div>
    </div>
  )
}