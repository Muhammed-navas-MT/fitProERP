import {
  LayoutDashboard,
  User,
  Calendar,
  DollarSign,
  FileText,
  Users,
  Dumbbell,
  MessageSquare,
  Bell,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import { useLocation, useNavigate } from "react-router-dom";
import { useTrainerLogout } from "@/hook/trainer/trainerLogoutHook";
import { useShowGymDetail } from "@/hook/trainer/trainerLoginHook";
import { useDispatch } from "react-redux";
import { deleteToken } from "@/store/slice/tokenSlice";
import { clearData } from "@/store/slice/authSlice";
import { clearAuthContext } from "@/store/slice/authContextState";
import { useEffect, useState } from "react";

const mainMenuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: `${FRONTEND_ROUTES.TRAINER.BASE}/${FRONTEND_ROUTES.TRAINER.DASHBOARD}`,
  },
  {
    icon: User,
    label: "Profile",
    path: `${FRONTEND_ROUTES.TRAINER.BASE}/${FRONTEND_ROUTES.TRAINER.PROFILE}`,
  },
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

const clientManagementItems = [
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
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: logout, isPending } = useTrainerLogout();
  const { data: gymDetail, isLoading } = useShowGymDetail();

  const [logoError, setLogoError] = useState(false);

  const gymName = gymDetail?.data?.gymName || "Gym";
  const gymLogo = gymDetail?.data?.logo || "";

  useEffect(() => {
    setLogoError(false);
  }, [gymLogo]);

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

  const renderSidebarHeader = () => {
    if (isLoading) {
      return (
        <div className="flex h-16 items-center gap-3 border-b border-[#1f1f1f] px-6">
          <div className="h-10 w-10 animate-pulse rounded-full bg-[#1a1a1a]" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-[#1a1a1a]" />
            <div className="h-3 w-16 animate-pulse rounded bg-[#151515]" />
          </div>
        </div>
      );
    }

    return (
      <div className="flex h-16 items-center gap-3 border-b border-[#1f1f1f] px-6">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
          {gymLogo && !logoError ? (
            <img
              src={gymLogo}
              alt={gymName}
              className="h-full w-full object-cover"
              onError={() => setLogoError(true)}
            />
          ) : (
            <Dumbbell className="h-6 w-6 text-white" />
          )}
        </div>

        <div className="min-w-0">
          <h1 className="truncate text-base font-bold text-white">{gymName}</h1>
          <p className="text-xs text-gray-400">Trainer Portal</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <aside className="hidden border-r border-[#1f1f1f] bg-[#0f0f0f] lg:fixed lg:inset-y-0 lg:flex lg:w-[220px] lg:flex-col">
        {renderSidebarHeader()}

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="mb-6">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-purple-400">
              Main
            </p>

            <nav className="space-y-1">
              {mainMenuItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "w-full justify-start gap-3 text-gray-300 hover:bg-[#1a1a1a] hover:text-white",
                    location.pathname === item.path &&
                      "bg-[#1a1a1a] text-white",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm">{item.label}</span>
                </Button>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-purple-400">
              Client Management
            </p>

            <nav className="space-y-1">
              {clientManagementItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "w-full justify-start gap-3 text-gray-300 hover:bg-[#1a1a1a] hover:text-white",
                    location.pathname === item.path &&
                      "bg-[#1a1a1a] text-white",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm">{item.label}</span>
                </Button>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-[#1f1f1f] p-3">
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
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#1f1f1f] bg-[#0f0f0f] px-4 py-2 lg:hidden">
        <div className="flex items-center justify-around">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              navigate(
                `${FRONTEND_ROUTES.TRAINER.BASE}/${FRONTEND_ROUTES.TRAINER.DASHBOARD}`,
              )
            }
            className={cn(
              "h-auto flex-col py-2",
              location.pathname ===
                `${FRONTEND_ROUTES.TRAINER.BASE}/${FRONTEND_ROUTES.TRAINER.DASHBOARD}`
                ? "text-white"
                : "text-gray-400 hover:text-white",
            )}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span className="mt-1 text-xs">Dashboard</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              navigate(
                `${FRONTEND_ROUTES.TRAINER.BASE}/${FRONTEND_ROUTES.TRAINER.LIST_MEMBERS}`,
              )
            }
            className={cn(
              "h-auto flex-col py-2",
              location.pathname ===
                `${FRONTEND_ROUTES.TRAINER.BASE}/${FRONTEND_ROUTES.TRAINER.LIST_MEMBERS}`
                ? "text-white"
                : "text-gray-400 hover:text-white",
            )}
          >
            <Users className="h-5 w-5" />
            <span className="mt-1 text-xs">Members</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              navigate(
                `${FRONTEND_ROUTES.TRAINER.BASE}/${FRONTEND_ROUTES.TRAINER.CHAT}`,
              )
            }
            className={cn(
              "h-auto flex-col py-2",
              location.pathname ===
                `${FRONTEND_ROUTES.TRAINER.BASE}/${FRONTEND_ROUTES.TRAINER.CHAT}`
                ? "text-white"
                : "text-gray-400 hover:text-white",
            )}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="mt-1 text-xs">Chat</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-auto flex-col py-2 text-gray-400 hover:text-white"
          >
            <Bell className="h-5 w-5" />
            <span className="mt-1 text-xs">Alerts</span>
          </Button>
        </div>
      </nav>
    </>
  );
}
