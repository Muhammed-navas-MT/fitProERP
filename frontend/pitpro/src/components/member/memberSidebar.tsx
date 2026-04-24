import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Dumbbell,
  Apple,
  Calendar,
  BarChart3,
  CreditCard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { deleteToken } from "@/store/slice/tokenSlice";
import { clearData } from "@/store/slice/authSlice";
import { clearAuthContext } from "@/store/slice/authContextState";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import { useMemberLogout } from "@/hook/member/memberLogoutHook";
import { useShowGymDetail } from "@/hook/member/memberLoginHook";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  {
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
    href: `${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.DASHBOARD}`,
  },
  {
    icon: <User size={20} />,
    label: "Profile",
    href: `${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.PROFILE}`,
  },
  {
    icon: <Dumbbell size={20} />,
    label: "Membership",
    href: `${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.MEMBERSHIP}`,
  },
  {
    icon: <Calendar size={20} />,
    label: "Workout Plans",
    href: `${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.WORKOUT_PLAN}`,
  },
  {
    icon: <Apple size={20} />,
    label: "Diet Plans",
    href: `${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.DIET_PLAN}`,
  },
  {
    icon: <Calendar size={20} />,
    label: "Book Trainer",
    href: `${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.BOOK_TRAINER}`,
  },
  {
    icon: <BarChart3 size={20} />,
    label: "Progress",
    href: `${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.PROGRESS}`,
  },
  {
    icon: <CreditCard size={20} />,
    label: "Payments",
    href: `${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.LIST_PAYMENTS}`,
  },
  {
    icon: <CreditCard size={20} />,
    label: "Chat",
    href: `${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.CHAT}`,
  },
];

export function Sidebar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const { mutate: logout, isPending } = useMemberLogout();
  const { data: gymDetail, isLoading } = useShowGymDetail();

  const gymName = gymDetail?.data?.gymName || "Gym";
  const gymLogo = gymDetail?.data?.logo || "";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setLogoError(false);
  }, [gymLogo]);

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

  const renderSidebarHeader = () => {
    if (isLoading) {
      return (
        <div className="p-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 animate-pulse rounded-lg bg-neutral-800" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-neutral-800" />
              <div className="h-3 w-20 animate-pulse rounded bg-neutral-900" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-lg bg-orange-600 flex items-center justify-center shadow-lg">
            {gymLogo && !logoError ? (
              <img
                src={gymLogo}
                alt={gymName}
                className="h-full w-full object-cover"
                onError={() => setLogoError(true)}
              />
            ) : (
              <Dumbbell size={20} className="text-white" />
            )}
          </div>

          <div className="min-w-0">
            <h2 className="truncate font-bold text-white">{gymName}</h2>
            <p className="text-xs text-gray-400">Member portal</p>
          </div>
        </div>
      </div>
    );
  };

  const sidebarContent = (
    <>
      {renderSidebarHeader()}

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => isMobile && setIsMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                isActive
                  ? "bg-orange-600 text-white shadow-md"
                  : "text-gray-400 hover:bg-white/5 hover:text-white",
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-800 p-4">
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
      {isMobile && (
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed top-4 left-4 z-40 rounded-lg border border-gray-800 bg-[#0a0a0a] p-2 md:hidden"
        >
          {isMobileOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Menu size={24} className="text-white" />
          )}
        </button>
      )}

      <aside className="fixed left-0 top-0 hidden h-screen w-56 flex-col border-r border-gray-800 bg-[#000000] md:flex">
        {sidebarContent}
      </aside>

      {isMobile && isMobileOpen && (
        <aside className="fixed inset-y-0 left-0 z-30 flex h-screen w-56 flex-col border-r border-gray-800 bg-[#000000] md:hidden">
          {sidebarContent}
        </aside>
      )}

      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
