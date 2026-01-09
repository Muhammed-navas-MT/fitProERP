import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Dumbbell,
  Apple,
  Calendar,
  BarChart3,
  Bell,
  CreditCard,
  AlertCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTrainerLogout } from "@/hook/trainer/trainerLogoutHook";
import { useDispatch } from "react-redux";
import { deleteToken } from "@/store/slice/tokenSlice";
import { clearData } from "@/store/slice/authSlice";
import { clearAuthContext } from "@/store/slice/authContextState";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: `${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.DASHBOARD}` },
  { icon: <User size={20} />, label: "Profile", href: `${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.PROFILE}` },
  { icon: <Dumbbell size={20} />, label: "Membership", href: "/#" },
  { icon: <Calendar size={20} />, label: "Workout Plans", href: "/##" },
  { icon: <Apple size={20} />, label: "Diet Plans", href: "/###" },
  { icon: <Calendar size={20} />, label: "Book Trainer", href: "/####" },
  { icon: <BarChart3 size={20} />, label: "Progress", href: "/#####" },
  { icon: <Bell size={20} />, label: "Notifications", href: "/######" },
  { icon: <CreditCard size={20} />, label: "Payments", href: "/#######" },
  { icon: <AlertCircle size={20} />, label: "Complaints", href: "/########" },
];

export function Sidebar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { mutate: logout, isPending } = useTrainerLogout();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const forceLogout = () => {
    dispatch(deleteToken());
    dispatch(clearData());
    dispatch(clearAuthContext());
  };

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: forceLogout,
      onError: forceLogout,
    });
  };

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center shadow-lg">
            <Dumbbell size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-white">Energy Gym</h2>
            <p className="text-xs text-gray-400">Member portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => isMobile && setIsMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium",
                isActive
                  ? "bg-orange-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          disabled={isPending}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
            text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition
            disabled:opacity-50"
        >
          <LogOut size={20} />
          <span>{isPending ? "Logging out..." : "Logout"}</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle */}
      {isMobile && (
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed top-4 left-4 z-40 md:hidden bg-[#0a0a0a] p-2 rounded-lg border border-gray-800"
        >
          {isMobileOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
        </button>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-56 bg-[#000000] flex-col h-screen border-r border-gray-800 fixed left-0 top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      {isMobile && isMobileOpen && (
        <aside className="fixed inset-y-0 left-0 z-30 md:hidden bg-[#000000] flex flex-col w-56 h-screen border-r border-gray-800">
          {sidebarContent}
        </aside>
      )}

      {/* Overlay */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
