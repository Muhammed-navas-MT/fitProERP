import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listNotificationService,
  markNotificationReadService,
  markAllNotificationReadService,
} from "@/services/member/notificationService";

export const useListNotifications = (page: number) => {
  return useQuery({
    queryKey: ["notifications", page],
    queryFn: () => listNotificationService(page),
    placeholderData: (prev) => prev,
  });
};

export const useMarkNotificationAsRead = (page: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) =>
      markNotificationReadService(notificationId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", page],
      });

      queryClient.invalidateQueries({
        queryKey: ["notifications-unread-count"],
      });
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationReadService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notifications-unread-count"],
      });
    },
  });
};
