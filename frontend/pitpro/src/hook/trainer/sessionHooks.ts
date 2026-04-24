import { ListSessionItem } from "@/page/trainer/trainerSchedulePage";
import {
  listSessionService,
  markAsCompletedService,
} from "@/services/trainer/sessionService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export enum SessionStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

interface ListSessionResponse {
  data: {
    sessions: ListSessionItem[];
    totalPages: number;
    total: number;
  };
}

interface MarkAsCompletedResponse {
  message: string;
}

export const useListSession = (page: number, limit: number) => {
  return useQuery<ListSessionResponse>({
    queryKey: ["sessions", page, limit],
    queryFn: () => listSessionService(page, limit),
  });
};

export const useMarkAsCompleted = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  return useMutation<MarkAsCompletedResponse, Error, string>({
    mutationFn: (sessionId: string) => markAsCompletedService(sessionId),

    onSuccess: (data, sessionId) => {
      queryClient.setQueryData<ListSessionResponse>(
        ["sessions", page, limit],
        (oldData): ListSessionResponse | undefined => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: {
              ...oldData.data,
              sessions: oldData.data.sessions.map((session) =>
                session.id === sessionId
                  ? {
                      ...session,
                      status: "COMPLETED" as SessionStatus,
                    }
                  : session,
              ),
            },
          };
        },
      );

      toast.success(data.message);
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
};