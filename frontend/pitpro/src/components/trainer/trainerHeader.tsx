import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import TrainerNotificationDropdown from "@/components/trainer/trainerNotificationDropdown";
import { useListNotifications } from "@/hook/trainer/trainerNotificationHook";
import { useNotificationSocket } from "@/hook/useNotificationSocket";
import type { NotificationSocketEvent } from "@/types/notificationSocketType";

interface HeaderProps {
  avatar: string;
  title: string;
  subtitle: string;
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

export function Header({ avatar, title, subtitle }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

  const { data } = useListNotifications(1);

  const unreadCount =
    data?.data?.unreadCount ??
    data?.unreadCount ??
    data?.data?.notifications?.filter(
      (item: { isRead: boolean }) => !item.isRead,
    ).length ??
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
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-[#1f1f1f] bg-[#0f0f0f] px-4 lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden text-gray-400 hover:text-white"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex flex-col">
        <h1 className="text-sm font-semibold text-white">{title}</h1>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>

      <div className="flex-1" />

      <div ref={wrapperRef} className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative text-gray-400 hover:text-white"
        >
          <Bell className="h-5 w-5" />

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] px-1 rounded-full bg-purple-500 text-[10px] font-bold text-white flex items-center justify-center">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>

        <TrainerNotificationDropdown
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>

      <Avatar className="h-9 w-9">
        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
          {avatar}
        </AvatarFallback>
      </Avatar>
    </header>
  );
}
