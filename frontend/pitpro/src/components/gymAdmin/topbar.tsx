import { Bell, Menu } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import GymAdminNotificationDropdown from "@/components/gymAdmin/gymAdminNotificationDropdown";
import { MobileNav } from "@/components/gymAdmin/sidebar";
import { useListNotifications } from "@/hook/gymAdmin/gymAdminNotificationHook";
import { useNotificationSocket } from "@/hook/useNotificationSocket";
import type { NotificationSocketEvent } from "@/types/notificationSocketType";
import type { rootstate } from "@/store/store";

interface TopBarProps {
  title: string;
  subtitle: string;
  showUserMenu?: boolean;
  children?: React.ReactNode;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt?: string | Date;
  actionLink?: string;
}

interface NotificationResponseShape {
  data?: {
    notifications?: NotificationItem[];
    unreadCount?: number;
  };
  notifications?: NotificationItem[];
  unreadCount?: number;
}

export function TopBar({
  title,
  subtitle,
  showUserMenu = true,
  children,
}: TopBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const { logo, gymName } = useSelector(
    (state: rootstate) => state.gymAdminData,
  );

  const { data } = useListNotifications(1);

  const unreadCount =
    data?.data?.unreadCount ??
    data?.unreadCount ??
    data?.data?.notifications?.filter((item: { isRead: boolean }) => !item.isRead)
      .length ??
    data?.notifications?.filter((item: { isRead: boolean }) => !item.isRead)
      .length ??
    0;

  const handleNewNotification = useCallback(
    (notification: NotificationSocketEvent) => {
      queryClient.setQueryData(
        ["notifications", 1],
        (oldData: NotificationResponseShape | undefined) => {
          const normalizedNotification: NotificationItem = {
            id: notification.id || notification._id || "",
            title: notification.title,
            message: notification.message,
            isRead: notification.isRead,
            createdAt: notification.createdAt,
            actionLink: notification.actionLink,
          };

          if (!oldData) {
            return {
              data: {
                notifications: [normalizedNotification],
                unreadCount: normalizedNotification.isRead ? 0 : 1,
              },
            };
          }

          if (oldData.data) {
            const oldNotifications = oldData.data.notifications || [];
            const exists = oldNotifications.some(
              (item) => item.id === normalizedNotification.id,
            );

            if (exists) return oldData;

            return {
              ...oldData,
              data: {
                ...oldData.data,
                notifications: [normalizedNotification, ...oldNotifications],
                unreadCount:
                  (oldData.data.unreadCount || 0) +
                  (normalizedNotification.isRead ? 0 : 1),
              },
            };
          }

          const oldNotifications = oldData.notifications || [];
          const exists = oldNotifications.some(
            (item) => item.id === normalizedNotification.id,
          );

          if (exists) return oldData;

          return {
            ...oldData,
            notifications: [normalizedNotification, ...oldNotifications],
            unreadCount:
              (oldData.unreadCount || 0) +
              (normalizedNotification.isRead ? 0 : 1),
          };
        },
      );
    },
    [queryClient],
  );

  useNotificationSocket({
    onNewNotification: handleNewNotification,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex-1 min-w-0 lg:ml-52">
      <MobileNav
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-950/90 px-4 py-3 backdrop-blur lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open navigation menu"
            className="-ml-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-orange-500 sm:text-xl lg:text-2xl">
              {title}
            </h1>
            {subtitle && (
              <p className="truncate text-xs text-zinc-400 sm:text-sm">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {showUserMenu && (
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div ref={wrapperRef} className="relative">
              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Notifications"
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                <Bell className="h-5 w-5" />

                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex min-w-[18px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold leading-4 text-white ring-2 ring-zinc-950">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </button>

              <GymAdminNotificationDropdown
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
              />
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 py-1 pl-1 pr-3 sm:flex">
              <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-white text-xs font-bold text-zinc-700">
                {logo ? (
                  <img
                    src={logo}
                    alt=""
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                ) : (
                  (gymName || "G").charAt(0).toUpperCase()
                )}
              </span>
              <span className="max-w-40 truncate text-sm font-medium text-zinc-200">
                {gymName || "Gym Admin"}
              </span>
            </div>
          </div>
        )}
      </header>

      <div className="p-4 lg:p-6">{children}</div>
    </div>
  );
}