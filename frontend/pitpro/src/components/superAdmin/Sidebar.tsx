import { 
  LayoutDashboard, 
  BarChart3, 
  CreditCard, 
  Building2, 
  Wallet, 
  X
} from "lucide-react"
import LogoutButton from "./LogoutButton"
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes"
import { useLocation } from "react-router-dom"

interface SidebarProps {
  onLogout: () => void
  isOpen?: boolean
  onClose?: () => void
  isMobile?: boolean
}

export default function Sidebar({ 
  onLogout, 
  isOpen = true, 
  onClose, 
  isMobile = false 
}: SidebarProps) {

  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: `${FRONTEND_ROUTES.SUPER_ADMIN.DASHBOARD}` },
    { icon: BarChart3, label: "Analytics", href: "#" },
    { icon: CreditCard, label: "Subscription", href: `${FRONTEND_ROUTES.SUPER_ADMIN.LIST_SUBSCRIPTION}` },
    { icon: Building2, label: "Gyms", href: FRONTEND_ROUTES.SUPER_ADMIN.LIST_GYMS },
    { icon: Wallet, label: "Payments", href: "#" },
  ];

  const getLinkClasses = (href: string) => {
    const isActive = location.pathname === href;

    return `
      flex items-center gap-3 px-4 py-3 rounded-lg transition 
      ${isActive ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}
    `;
  };

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
        
        <div className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-[#111418] border-r border-gray-800 transform transition-transform duration-300 lg:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Energy Gym</h1>
                <p className="text-gray-500 text-xs">Gym Management</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href}
                    className={getLinkClasses(item.href)}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-800">
            <LogoutButton onLogout={onLogout} />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={`
      w-64 h-screen bg-[#111418] border-r border-gray-800 flex flex-col transition-all duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}>
      
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">E</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Energy Gym</h1>
            <p className="text-gray-500 text-xs">Gym Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a 
                href={item.href}
                className={getLinkClasses(item.href)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <LogoutButton onLogout={onLogout} />
      </div>
    </div>
  );
}
