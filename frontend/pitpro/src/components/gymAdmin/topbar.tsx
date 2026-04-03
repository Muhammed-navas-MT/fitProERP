import { Bell } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import GymAdminNotificationDropdown from "@/components/gymAdmin/gymAdminNotificationDropdown";
import { useListNotifications } from "@/hook/gymAdmin/gymAdminNotificationHook";
import { useNotificationSocket } from "@/hook/useNotificationSocket";
import type { NotificationSocketEvent } from "@/types/notificationSocketType";

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
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

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
    <div className="flex-1 lg:ml-52">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 lg:px-6 lg:py-3">
        <div>
          <h1 className="text-lg font-semibold text-orange-500 lg:text-4xl">
            {title}
          </h1>
          <p className="text-2 text-zinc-400">{subtitle}</p>
        </div>

        {showUserMenu && (
          <div className="flex items-center gap-4">
            <div ref={wrapperRef} className="relative">
              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="relative"
              >
                <Bell className="h-5 w-5 text-orange-500" />

                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] rounded-full bg-orange-500 px-1 text-center text-[10px] font-bold text-white">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </button>

              <GymAdminNotificationDropdown
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
              />
            </div>

            <br />
          </div>
        )}
      </div>

      <div className="p-4 lg:p-6">{children}</div>
    </div>
  );
}