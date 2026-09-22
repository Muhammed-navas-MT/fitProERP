import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Package,
  Building2,
  TrendingDown,
  TrendingUp,
  CreditCard,
  DollarSign,
  LogOut,
  Rocket,
  FileText,
  User,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { clearAuthContext } from "@/store/slice/authContextState";
import { useDispatch, useSelector } from "react-redux";
import { deleteToken } from "@/store/slice/tokenSlice";
import { clearGymAdminData } from "@/store/slice/gymAdminSlice";
import { useGymAdminLogout } from "@/hook/gymAdmin/gymAdminLogoutHook";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import { rootstate } from "@/store/store";

type NavItem = { name: string; href: string; icon: LucideIcon };
type NavGroup = { label: string; items: NavItem[] };

const B = FRONTEND_ROUTES.GYM_ADMIN.BASE;

/**
 * Navigation groups are a purely visual arrangement of the SAME routes that
 * existed before — no route strings changed, none added or removed.
 */
const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        name: "Dashboard",
        href: `${B}/${FRONTEND_ROUTES.GYM_ADMIN.DASHBOARD}`,
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        name: "Members",
        href: `${B}/${FRONTEND_ROUTES.GYM_ADMIN.LIST_MEMBERS}`,
        icon: Users,
      },
      {
        name: "Trainers",
        href: `${B}/${FRONTEND_ROUTES.GYM_ADMIN.LIST_EMPLOYEES}`,
        icon: UserCog,
      },
      {
        name: "Packages",
        href: `${B}/${FRONTEND_ROUTES.GYM_ADMIN.LIST_PACKAGE}`,
        icon: Package,
      },
      {
        name: "Branches",
        href: `${B}/${FRONTEND_ROUTES.GYM_ADMIN.LIST_BRANCH}`,
        icon: Building2,
      },
    ],
  },
  {
    label: "Finance",
    items: [
      {
        name: "Revenues",
        href: `${B}/${FRONTEND_ROUTES.GYM_ADMIN.LIST_REVENUE}`,
        icon: CreditCard,
      },
      {
        name: "Expenses",
        href: `${B}/${FRONTEND_ROUTES.GYM_ADMIN.LIST_EXPENSE}`,
        icon: TrendingDown,
      },
      {
        name: "Profit Analytics",
        href: `${B}/${FRONTEND_ROUTES.GYM_ADMIN.PROFIT}`,
        icon: TrendingUp,
      },
      {
        name: "Salary",
        href: `${B}/${FRONTEND_ROUTES.GYM_ADMIN.SALARY}`,
        icon: DollarSign,
      },
    ],
  },
  {
    label: "More",
    items: [
      {
        name: "Trainers Leaves",
        href: `${B}/${FRONTEND_ROUTES.GYM_ADMIN.LEAVE}`,
        icon: FileText,
      },
      {
        name: "Plan upgrade",
        href: `${B}/${FRONTEND_ROUTES.GYM_ADMIN.SUBSCRIPTION}`,
        icon: Rocket,
      },
      {
        name: "Profile",
        href: `${B}/${FRONTEND_ROUTES.GYM_ADMIN.GYM_INFO}`,
        icon: User,
      },
    ],
  },
];

/** Wraps the existing logout hook + store cleanup (unchanged behaviour). */
function useAdminLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate: logout } = useGymAdminLogout();

  return () =>
    logout(undefined, {
      onSuccess: () => {
        dispatch(deleteToken());
        dispatch(clearGymAdminData());
        dispatch(clearAuthContext());
        navigate(
          `${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${FRONTEND_ROUTES.GYM_ADMIN.LOGIN}`,
          { replace: true },
        );
      },
      onError: (error) => {
        console.error(error.message);
      },
    });
}

function BrandHeader({ logo, gymName }: { logo?: string; gymName?: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-zinc-700">
        {logo ? (
          <img
            src={logo}
            alt="Gym Logo"
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <svg className="h-6 w-6 text-gray-600" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        )}
      </div>
      <div className="min-w-0">
        <h2 className="truncate text-sm font-bold text-white">
          {gymName || "FitPro ERP"}
        </h2>
        <p className="text-xs text-zinc-500">Gym Management</p>
      </div>
    </div>
  );
}

function NavList({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
      {navGroups.map((group) => (
        <div key={group.label}>
          <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
            {group.label}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={onNavigate}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-orange-500/10 font-medium text-orange-500"
                        : "text-zinc-400 hover:bg-zinc-800/70 hover:text-white",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-orange-500 transition-opacity",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function LogoutRow({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="border-t border-zinc-800 p-3">
      <button
        onClick={onLogout}
        className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </div>
  );
}

/** Desktop sidebar (unchanged: fixed, hidden below lg). */
export function Sidebar() {
  const { pathname } = useLocation();
  const handleLogout = useAdminLogout();
  const { logo, gymName } = useSelector(
    (state: rootstate) => state.gymAdminData,
  );

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-52 flex-col border-r border-zinc-800 bg-zinc-950/95 backdrop-blur lg:flex">
      <BrandHeader logo={logo} gymName={gymName} />
      <NavList pathname={pathname} />
      <LogoutRow onLogout={handleLogout} />
    </aside>
  );
}

/** Mobile slide-in navigation drawer (controlled by the TopBar hamburger). */
export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { pathname } = useLocation();
  const handleLogout = useAdminLogout();
  const { logo, gymName } = useSelector(
    (state: rootstate) => state.gymAdminData,
  );

  return (
    <div
      className={cn("fixed inset-0 z-50 lg:hidden", open ? "" : "pointer-events-none")}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/60 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        className={cn(
          "absolute left-0 top-0 flex h-full w-[17rem] max-w-[85vw] flex-col border-r border-zinc-800 bg-zinc-950 shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <BrandHeader logo={logo} gymName={gymName} />
        <NavList pathname={pathname} onNavigate={onClose} />
        <LogoutRow
          onLogout={() => {
            onClose();
            handleLogout();
          }}
        />
      </aside>
    </div>
  );
}
