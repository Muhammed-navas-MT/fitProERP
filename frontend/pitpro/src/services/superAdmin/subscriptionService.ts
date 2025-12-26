import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { FinalSubmissionType } from "@/validation/subscriptionShema";
import { AxiosError } from "axios";

export const getSubscriptions = async (page: number, search: string) => {
  const response = await AxiosInstance.get(
    `${API_ROUTES.SUPERADMIN.BASE}${API_ROUTES.SUPERADMIN.LIST_SUBSCRIPTION}?page=${page}&limit=5&search=${search}`
  );
  return response.data;
};

export const addSubscriptionService = async (data: FinalSubmissionType) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.SUPERADMIN.BASE}${API_ROUTES.SUPERADMIN.CREATE_SUBSCRIPTION}`,
      data
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error
  }
};

export const blockSubscription = async (subscriptionId: string) => {
  try {
    const response = await AxiosInstance.put(
      `${API_ROUTES.SUPERADMIN.BASE}${API_ROUTES.SUPERADMIN.BLOCK_SUBSCRIPTION}/${subscriptionId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
    throw error;
  }
};

export const unBlockSubscription = async (subscriptionId: string) => {
  try {
    const response = await AxiosInstance.put(
      `${API_ROUTES.SUPERADMIN.BASE}${API_ROUTES.SUPERADMIN.UNBLOCK_SUBSCRIPTION}/${subscriptionId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
    throw error;
  }
};

export const getSingleSubscription = async (subscriptionId: string) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.SUPERADMIN.BASE}${API_ROUTES.SUPERADMIN.FIND_SUBSCRIPTION}/${subscriptionId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
    throw error;
  }
};

export const updateSubscriptionService = async (
  id: string,
  data: FinalSubmissionType
) => {
  try {
    const response = await AxiosInstance.put(
      `${API_ROUTES.SUPERADMIN.BASE}${API_ROUTES.SUPERADMIN.UPDATE_SUBSCRIPTION}/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    }
    throw error;
  }
};
