import { useState } from "react";
import {
  LayoutDashboard,
  User,
  Calendar,
  DollarSign,
  FileText,
  Users,
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
import { useTrainerLogout } from "@/hook/trainer/trainerLogoutHook";
import { deleteToken } from "@/store/slice/tokenSlice";
import { clearData } from "@/store/slice/authSlice";
import { clearAuthContext } from "@/store/slice/authContextState";

const primaryNavItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: `${FRONTEND_ROUTES.TRAINER.BASE}/${FRONTEND_ROUTES.TRAINER.DASHBOARD}`,
  },
  {
    icon: Users,
    label: "Members",
    path: `${FRONTEND_ROUTES.TRAINER.BASE}/${FRONTEND_ROUTES.TRAINER.LIST_MEMBERS}`,
  },
  {
    icon: MessageSquare,
    label: "Chat",
    path: `${FRONTEND_ROUTES.TRAINER.BASE}/${FRONTEND_ROUTES.TRAINER.CHAT}`,
  },
  {
    icon: User,
    label: "Profile",
    path: `${FRONTEND_ROUTES.TRAINER.BASE}/${FRONTEND_ROUTES.TRAINER.PROFILE}`,
  },
];

const moreNavItems = [
  {
    icon: Calendar,
    label: "My Schedule",
    path: `${FRONTEND_ROUTES.TRAINER.BASE}/${FRONTEND_ROUTES.TRAINER.SESSION}`,
  },
  {
    icon: DollarSign,
    label: "Salary",
    path: `${FRONTEND_ROUTES.TRAINER.BASE}/${FRONTEND_ROUTES.TRAINER.SALARY}`,
  },
  {
    icon: FileText,
    label: "Leave Request",
    path: `${FRONTEND_ROUTES.TRAINER.BASE}/${FRONTEND_ROUTES.TRAINER.LEAVE}`,
  },
];

export function TrainerMobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [moreOpen, setMoreOpen] = useState(false);

  const { mutate: logout, isPending } = useTrainerLogout();

  const isMoreActive = moreNavItems.some(
    (item) => location.pathname === item.path,
  );

  const handleNavigate = (path: string) => {
    navigate(path);
    setMoreOpen(false);
  };

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        dispatch(deleteToken());
        dispatch(clearData());
        dispatch(clearAuthContext());
        navigate(
          `${FRONTEND_ROUTES.TRAINER.BASE}/${FRONTEND_ROUTES.TRAINER.LOGIN}`,
          { replace: true },
        );
      },
      onError: () => {
        dispatch(deleteToken());
        dispatch(clearData());
        dispatch(clearAuthContext());
        navigate(
          `${FRONTEND_ROUTES.TRAINER.BASE}/${FRONTEND_ROUTES.TRAINER.LOGIN}`,
          { replace: true },
        );
      },
    });
  };

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-[#1f1f1f] bg-[#0f0f0f] lg:hidden"
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
                  ? "text-purple-400"
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
              ? "text-purple-400"
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
          className="max-h-[80vh] overflow-y-auto rounded-t-2xl border-t border-[#1f1f1f] bg-[#0f0f0f] pb-[calc(env(safe-area-inset-bottom)+1rem)]"
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
                    "w-full justify-start gap-3 text-gray-300 hover:bg-[#1a1a1a] hover:text-white",
                    isActive && "bg-[#1a1a1a] text-white",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm">{item.label}</span>
                </Button>
              );
            })}

            <div className="my-2 border-t border-[#1f1f1f]" />

            <Button
              onClick={handleLogout}
              disabled={isPending}
              variant="ghost"
              className="w-full justify-start gap-3 text-gray-300 hover:bg-[#1a1a1a] hover:text-white disabled:opacity-60"
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
