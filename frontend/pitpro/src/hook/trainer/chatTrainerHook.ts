import {
  createTrainerConversationService,
  listMessagesService,
  listTrainerConversationsService,
  markConversationSeenService,
  sendTrainerMessageService,
} from "@/services/trainer/chatTrainerService";
import {
  CreateConversationPayload,
  SendMessagePayload,
} from "@/types/member/chatType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateConversationPayload) =>
      createTrainerConversationService(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
  });
};

export const useListConversations = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: () => listTrainerConversationsService(),
  });
};

export const useSendMessage = (conversationId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SendMessagePayload) => sendTrainerMessageService(data),

    onSuccess: () => {
      if (conversationId) {
        queryClient.invalidateQueries({
          queryKey: ["messages", conversationId],
        });
      }

      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
  });
};

export const useListMessages = (
  conversationId: string,
  page: number = 1,
  limit: number = 20,
) => {
  return useQuery({
    queryKey: ["messages", conversationId, page, limit],
    queryFn: () => listMessagesService(conversationId, page, limit),
    enabled: !!conversationId,
  });
};

export const useMarkConversationSeen = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationId: string) =>
      markConversationSeenService(conversationId),

    onSuccess: (_, conversationId) => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });

      queryClient.invalidateQueries({
        queryKey: ["messages", conversationId],
      });
    },
  });
};
