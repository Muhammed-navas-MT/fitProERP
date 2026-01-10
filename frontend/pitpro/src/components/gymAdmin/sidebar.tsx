import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  UserCog,
  Package,
  Building2,
  TrendingDown,
  TrendingUp,
  CreditCard,
  AlertCircle,
  Info,
  DollarSign,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { clearAuthContext } from "@/store/slice/authContextState"
import { useDispatch } from "react-redux"
import { deleteToken } from "@/store/slice/tokenSlice"
import { clearGymAdminData } from "@/store/slice/gymAdminSlice"
import { useGymAdminLogout } from "@/hook/gymAdmin/gymAdminLogoutHook"
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes"


const navItems = [
  { name: "Dashboard", href:`${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${ FRONTEND_ROUTES.GYM_ADMIN.DASHBOARD}`, icon: LayoutDashboard },
  { name: "Members", href: `${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${ FRONTEND_ROUTES.GYM_ADMIN.LIST_MEMBERS}`, icon: Users },
  { name: "Trainers", href: `${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${ FRONTEND_ROUTES.GYM_ADMIN.LIST_EMPLOYEES}`, icon: UserCog },
  { name: "Packages", href: "/packages", icon: Package },
  { name: "Branches", href: `${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${ FRONTEND_ROUTES.GYM_ADMIN.LIST_BRANCH}`, icon: Building2 },
  { name: "Expenses", href: "/expenses", icon: TrendingDown },
  { name: "Profit Analytics", href: "/analytics", icon: TrendingUp },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Problems", href: "/problems", icon: AlertCircle },
  { name: "Gym Info", href: `${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${ FRONTEND_ROUTES.GYM_ADMIN.GYM_INFO}`, icon: Info },
  { name: "Salary", href: "/salary", icon: DollarSign },
]

export function Sidebar() {
  const location = useLocation()
  const pathname = location.pathname
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {mutate:logout} = useGymAdminLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        dispatch(deleteToken());
        dispatch(clearGymAdminData());
        dispatch(clearAuthContext());
         navigate(`${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${FRONTEND_ROUTES.GYM_ADMIN.LOGIN}`,{ replace: true });
      },
      onError: (error) => {
        console.error(error.message);
      },
    });
  };

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-52 flex-col border-r border-zinc-800 bg-black/40 lg:flex">
      <div className="flex items-center gap-3 border-b border-zinc-800 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
            <path
              d="M17 8C17 10.2091 15.2091 12 13 12C10.7909 12 9 10.2091 9 8"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">Energy Gym</h2>
          <p className="text-xs text-zinc-400">Gym Management</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "mb-1 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-orange-500/10 text-orange-500"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-zinc-800 p-3">
        <button onClick={()=>handleLogout()} className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
