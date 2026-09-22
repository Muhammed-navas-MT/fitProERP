import { useState } from "react";
import {
  LayoutDashboard,
  User,
  Dumbbell,
  Apple,
  Calendar,
  BarChart3,
  CreditCard,
  MessageSquare,
  MoreHorizontal,
  LogOut,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import { useMemberLogout } from "@/hook/member/memberLogoutHook";
import { deleteToken } from "@/store/slice/tokenSlice";
import { clearData } from "@/store/slice/authSlice";
import { clearAuthContext } from "@/store/slice/authContextState";

const primaryNavItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: `${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.DASHBOARD}`,
  },
  {
    icon: Dumbbell,
    label: "Membership",
    path: `${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.MEMBERSHIP}`,
  },
  {
    icon: MessageSquare,
    label: "Chat",
    path: `${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.CHAT}`,
  },
  {
    icon: User,
    label: "Profile",
    path: `${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.PROFILE}`,
  },
];

const moreNavItems = [
  {
    icon: Calendar,
    label: "Workout Plans",
    path: `${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.WORKOUT_PLAN}`,
  },
  {
    icon: Apple,
    label: "Diet Plans",
    path: `${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.DIET_PLAN}`,
  },
  {
    icon: Calendar,
    label: "Book Trainer",
    path: `${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.BOOK_TRAINER}`,
  },
  {
    icon: BarChart3,
    label: "Progress",
    path: `${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.PROGRESS}`,
  },
  {
    icon: CreditCard,
    label: "Payments",
    path: `${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.LIST_PAYMENTS}`,
  },
];

export function MemberMobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [moreOpen, setMoreOpen] = useState(false);

  const { mutate: logout, isPending } = useMemberLogout();

  const isMoreActive = moreNavItems.some(
    (item) => location.pathname === item.path,
  );

  const handleNavigate = (path: string) => {
    navigate(path);
    setMoreOpen(false);
  };

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

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-gray-800 bg-black md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {primaryNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => navigate(item.path)}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium transition-colors",
                isActive
                  ? "text-orange-500"
                  : "text-gray-400 hover:text-white",
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setMoreOpen(true)}
          className={cn(
            "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium transition-colors",
            isMoreActive || moreOpen
              ? "text-orange-500"
              : "text-gray-400 hover:text-white",
          )}
        >
          <MoreHorizontal className="h-5 w-5 shrink-0" />
          <span className="truncate">More</span>
        </button>
      </nav>

      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetContent
          side="bottom"
          className="max-h-[80vh] overflow-y-auto rounded-t-2xl border-t border-gray-800 bg-black pb-[calc(env(safe-area-inset-bottom)+1rem)]"
        >
          <SheetHeader>
            <SheetTitle className="text-white">More</SheetTitle>
          </SheetHeader>

          <div className="mt-2 flex flex-col gap-1">
            {moreNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.label}
                  variant="ghost"
                  onClick={() => handleNavigate(item.path)}
                  className={cn(
                    "w-full justify-start gap-3 text-gray-300 hover:bg-white/5 hover:text-white",
                    isActive && "bg-white/5 text-white",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm">{item.label}</span>
                </Button>
              );
            })}

            <div className="my-2 border-t border-gray-800" />

            <Button
              onClick={handleLogout}
              disabled={isPending}
              variant="ghost"
              className="w-full justify-start gap-3 text-gray-400 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-60"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm">
                {isPending ? "Logging out..." : "Logout"}
              </span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
