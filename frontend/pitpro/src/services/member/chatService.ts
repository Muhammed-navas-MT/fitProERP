import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import {
  CreateConversationPayload,
  SendMessagePayload,
} from "@/types/member/chatType";
import { AxiosError } from "axios";

export const createConversationService = async (
  data: CreateConversationPayload,
) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.CONVERSATION}`,
      data,
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Failed to create conversation",
      );
    }
    throw error;
  }
};

export const ConversationService = async (data: CreateConversationPayload) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.CONVERSATION}`,
      data,
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Failed to create conversation",
      );
    }
    throw error;
  }
};

export const listConversationsService = async () => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.CONVERSATIONS}`,
    );

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch conversations",
      );
    }
    throw error;
  }
};

export const sendMessageService = async (data: SendMessagePayload) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.MESSAGE}`,
      data,
    );

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Failed to send message",
      );
    }
    throw error;
  }
};

export const listMessagesService = async (
  conversationId: string,
  page = 1,
  limit = 20,
) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.LIST_MESSAGES}/${conversationId}`,
      {
        params: { page, limit },
      },
    );

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch messages",
      );
    }
    throw error;
  }
};

export const markConversationSeenService = async (conversationId: string) => {
  try {
    const response = await AxiosInstance.patch(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.CONVERSATION}/${conversationId}/seen`,
    );

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to mark seen");
    }
    throw error;
  }
};

export const uploadChatImageService = async (data: {
  file: File;
  conversationId: string;
  receiverId: string;
  text?: string;
}) => {
  try {
    const formData = new FormData();
    formData.append("image", data.file);
    formData.append("conversationId", data.conversationId);
    formData.append("receiverId", data.receiverId);

    if (data.text?.trim()) {
      formData.append("text", data.text.trim());
    }

    const response = await AxiosInstance.post(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.UPLOAD_CHAT_IMAGE}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Failed to upload chat image",
      );
    }
    throw error;
  }
};
