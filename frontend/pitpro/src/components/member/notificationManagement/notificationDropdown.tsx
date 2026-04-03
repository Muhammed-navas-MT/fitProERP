import { useMemo, useState } from "react";
import {
  Bell,
  BellOff,
  Check,
  CheckCheck,
  Loader2,
  X,
} from "lucide-react";
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
    if (activeTab === "UNREAD") {
      return notifications.filter((item) => !item.isRead);
    }
    return notifications;
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

    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    if (diffDay < 7) return `${diffDay}d ago`;

    return created.toLocaleDateString();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-14 z-50 w-[380px] overflow-hidden rounded-3xl border border-orange-500/20 bg-zinc-950 shadow-2xl shadow-black/40">
      <div className="border-b border-zinc-800 px-5 py-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10">
              <Bell className="h-7 w-7 text-orange-400" />
            </div>

            <div>
              <h2 className="text- font-bold text-white">Notification</h2>
              <p className="text-sm text-zinc-400">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                  : "No unread notifications"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("UNREAD")}
            className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
              activeTab === "UNREAD"
                ? "bg-orange-500 text-white"
                : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            <span className="flex items-center gap-2">
              Unread
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  activeTab === "UNREAD"
                    ? "bg-white/20 text-white"
                    : "bg-zinc-800 text-zinc-300"
                }`}
              >
                {unreadCount}
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("ALL")}
            className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
              activeTab === "ALL"
                ? "bg-orange-500 text-white"
                : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            All
          </button>
        </div>

        <button
          type="button"
          onClick={handleMarkAllRead}
          disabled={isMarkingAllRead || unreadCount === 0}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 text-zinc-300 transition hover:bg-orange-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          title="Mark all as read"
        >
          {isMarkingAllRead ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <CheckCheck className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="max-h-[420px] overflow-y-auto px-3 pb-3">
        {isLoading ? (
          <div className="flex h-[260px] items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-orange-400" />
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="flex h-[260px] flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900">
              <BellOff className="h-8 w-8 text-zinc-500" />
            </div>
            <p className="text-xl font-medium text-zinc-300">
              No notifications found
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              You're all caught up for now
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredNotifications.map((notification) => (
              <button
                key={notification.id}
                type="button"
                onClick={() => handleNotificationClick(notification)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  notification.isRead
                    ? "border-zinc-800 bg-zinc-900/70 hover:border-zinc-700 hover:bg-zinc-900"
                    : "border-orange-500/20 bg-orange-500/10 hover:border-orange-400/40 hover:bg-orange-500/15"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="truncate text-sm font-semibold text-white">
                        {notification.title}
                      </h4>

                      {!notification.isRead && (
                        <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
                      )}
                    </div>

                    <p className="mt-1 line-clamp-2 text-sm text-zinc-400">
                      {notification.message}
                    </p>

                    <p className="mt-3 text-xs text-zinc-500">
                      {formatTime(notification.createdAt)}
                    </p>
                  </div>

                  {!notification.isRead && isMarkingRead ? (
                    <Loader2 className="mt-1 h-4 w-4 animate-spin text-orange-400" />
                  ) : !notification.isRead ? (
                    <Check className="mt-1 h-4 w-4 text-orange-400" />
                  ) : null}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}