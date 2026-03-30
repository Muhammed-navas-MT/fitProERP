import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { CreateMemberSessionCheckoutType } from "@/types/member/memberSessionType";
import { AxiosError } from "axios";

export const listAvailabeSlotService = async (trainerId: string) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.LIST_AVAILABLE_SLOT}`,
      { params: { trainerId } },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const checkoutSessionService = async (
  data: CreateMemberSessionCheckoutType,
) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.CHECKOUT_SESSION}`,
      data,
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Payment failed");
    }
    throw error;
  }
};

export const listAllSessionService = async (page: number, limit: number) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.LIST_SESSIONS}`,
      { params: { page, limit } },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const cancelSessionService = async (sessionId: string) => {
  try {
    const response = await AxiosInstance.put(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.CANCEL_SESSION}/${sessionId}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};
