import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios";

export const getGyms = async (page: number, search: string) => {
  const response = await AxiosInstance.get(
    `${API_ROUTES.SUPERADMIN.BASE}${API_ROUTES.SUPERADMIN.LIST_GYM}?page=${page}&limit=5&search=${search}`
  );
  return response.data;
};

export const blockGym = async (gymId: string) => {
  try {
    const response = await AxiosInstance.put(
      `${API_ROUTES.SUPERADMIN.BASE}${API_ROUTES.SUPERADMIN.BLOCK_GYM}/${gymId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
    throw error;
  }
};

export const unBlockGym = async (gymId: string) => {
  try {
    const response = await AxiosInstance.put(
      `${API_ROUTES.SUPERADMIN.BASE}${API_ROUTES.SUPERADMIN.UNBLOCK_GYM}/${gymId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
    throw error;
  }
};