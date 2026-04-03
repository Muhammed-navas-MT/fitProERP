import { useEffect } from "react";
import { getSocket } from "@/lib/socket";
import type { NotificationSocketEvent } from "@/types/notificationSocketType";

interface UseNotificationSocketProps {
  onNewNotification?: (notification: NotificationSocketEvent) => void;
}

export const useNotificationSocket = ({
  onNewNotification,
}: UseNotificationSocketProps) => {
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    if (onNewNotification) {
      socket.on("notification:new", onNewNotification);
    }

    return () => {
      if (onNewNotification) {
        socket.off("notification:new", onNewNotification);
      }
    };
  }, [onNewNotification]);
};
