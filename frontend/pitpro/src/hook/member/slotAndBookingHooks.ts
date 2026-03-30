import {
  cancelSessionService,
  checkoutSessionService,
  listAllSessionService,
  listAvailabeSlotService,
} from "@/services/member/slotAndBookingServices";
import { CreateMemberSessionCheckoutType } from "@/types/member/memberSessionType";
import { ListAllSessionResponse, ListSessionItem, SessionStatus } from "@/types/member/sessionType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useListAvailableSlot = (trainerId: string) => {
  return useQuery({
    queryKey: ["available_slot", trainerId],
    queryFn: () => listAvailabeSlotService(trainerId),
    enabled: !!trainerId,
    refetchInterval: 10000,
    refetchOnWindowFocus: false,
  });
};

export const useCheckoutSession = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMemberSessionCheckoutType) =>
      checkoutSessionService(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sessions", page, limit],
      });
    },
  });
};

export const useListAllSession = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["sessions", page, limit],
    queryFn: () => listAllSessionService(page, limit),
  });
};

export const useCancelSession = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => cancelSessionService(sessionId),

    onSuccess: (_, sessionId) => {
      queryClient.setQueryData<ListAllSessionResponse>(
        ["sessions", page, limit],
        (oldData) => {
          console.log("old data", oldData, "session id", sessionId);

          if (!oldData) return oldData;

          const oldSessions: ListSessionItem[] = oldData.data.session;

          const wasUpcoming = oldSessions.some(
            (item) =>
              item._id === sessionId && item.status === SessionStatus.CONFIRMED,
          );

          return {
            ...oldData,
            data: {
              ...oldData.data,
              session: oldSessions.map((session) =>
                session._id === sessionId
                  ? { ...session, status: SessionStatus.CANCELLED }
                  : session,
              ),
              countOfUpComingSession:
                wasUpcoming && oldData.data.countOfUpComingSession > 0
                  ? oldData.data.countOfUpComingSession - 1
                  : oldData.data.countOfUpComingSession,
            },
          };
        },
      );

      toast.success("Session cancelled successfully");
    },

    onError: (err) => {
      toast.error(err?.message || "Failed to cancel session");
    },
  });
};
