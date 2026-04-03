import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios";

export const listNotificationService = async (page: number) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.LIST_NOTIFICATION}`,
      { params: { page, limit: 15 } },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const markNotificationReadService = async (notificationId: string) => {
  try {
    const response = await AxiosInstance.patch(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.MARK_NOTIFICATION}/${notificationId}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const markAllNotificationReadService = async () => {
  try {
    const response = await AxiosInstance.patch(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.MARK_ALL_NOTIFICATION}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};
