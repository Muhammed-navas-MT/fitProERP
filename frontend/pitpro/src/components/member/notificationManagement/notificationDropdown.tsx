import { useMemo, useState } from "react";
import { Bell, CheckCheck, Loader2, X } from "lucide-react";
import {
  useListNotifications,
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
} from "@/hook/member/notificationHooks";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt?: string | Date;
  actionLink?: string;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "UNREAD" | "ALL";

export default function NotificationDropdown({ isOpen, onClose }: Props) {
  const [page] = useState(1);
  const [activeTab, setActiveTab] = useState<TabType>("UNREAD");

  const { data, isLoading } = useListNotifications(page);
  const { mutate: markAsRead, isPending: isMarkingRead } =
    useMarkNotificationAsRead(page);
  const { mutate: markAllAsRead, isPending: isMarkingAllRead } =
    useMarkAllNotificationsAsRead();

  const notifications: NotificationItem[] =
    data?.data?.notifications || data?.notifications || [];

  const unreadCount =
    data?.data?.unreadCount ??
    data?.unreadCount ??
    notifications.filter((item) => !item.isRead).length;

  const filteredNotifications = useMemo(() => {
    return activeTab === "UNREAD"
      ? notifications.filter((item) => !item.isRead)
      : notifications;
  }, [notifications, activeTab]);

  const handleNotificationClick = (notification: NotificationItem) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };

  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  const formatTime = (date?: string | Date) => {
    if (!date) return "";
    const now = new Date();
    const created = new Date(date);
    const diffMs = now.getTime() - created.getTime();
    const diffMin = Math.floor(diffMs / (1000 * 60));
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffMin < 1) return "now";
    if (diffMin < 60) return `${diffMin}m`;
    if (diffHour < 24) return `${diffHour}h`;
    if (diffDay < 7) return `${diffDay}d`;

    return created.toLocaleDateString();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-14 z-50 w-[340px] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-xl">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-orange-400" />
          <h2 className="text-sm font-semibold text-white">Notifications</h2>
          {unreadCount > 0 && (
            <span className="rounded-full bg-orange-500/15 px-2 py-0.5 text-[11px] text-orange-400">
              {unreadCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleMarkAllRead}
            disabled={isMarkingAllRead || unreadCount === 0}
            className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            title="Mark all as read"
          >
            {isMarkingAllRead ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCheck className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-2 border-b border-zinc-800 px-4 py-2">
        <button
          type="button"
          onClick={() => setActiveTab("UNREAD")}
          className={`rounded-md px-3 py-1 text-xs font-medium ${
            activeTab === "UNREAD"
              ? "bg-orange-500 text-white"
              : "bg-zinc-900 text-zinc-400"
          }`}
        >
          Unread
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("ALL")}
          className={`rounded-md px-3 py-1 text-xs font-medium ${
            activeTab === "ALL"
              ? "bg-orange-500 text-white"
              : "bg-zinc-900 text-zinc-400"
          }`}
        >
          All
        </button>
      </div>

      <div className="max-h-[360px] overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-5 w-5 animate-spin text-orange-400" />
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-zinc-500">
            No notifications
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <button
              key={notification.id}
              type="button"
              onClick={() => handleNotificationClick(notification)}
              className={`w-full border-b border-zinc-800 px-4 py-3 text-left hover:bg-zinc-900/70 ${
                !notification.isRead ? "bg-orange-500/5" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-white">
                      {notification.title}
                    </p>
                    {!notification.isRead && (
                      <span className="h-2 w-2 rounded-full bg-orange-400" />
                    )}
                  </div>

                  <p className="mt-1 text-xs text-zinc-400 whitespace-normal break-words">
                    {notification.message}
                  </p>

                  <p className="mt-1 text-[11px] text-zinc-500">
                    {formatTime(notification.createdAt)}
                  </p>
                </div>

                {!notification.isRead && isMarkingRead ? (
                  <Loader2 className="mt-0.5 h-3.5 w-3.5 animate-spin text-orange-400" />
                ) : null}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
