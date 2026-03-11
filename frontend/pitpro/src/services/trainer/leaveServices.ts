import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { CreateLeaveItem } from "@/types/trainer/leaveType";
import { AxiosError } from "axios";

export const createLeaveService = async (data: CreateLeaveItem) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.CREATE_LEAVE}`,
      data,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const findLeaveService = async (leaveId: string) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.FIND_LEAVE}/${leaveId}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const updateLeaveService = async (data: CreateLeaveItem) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.UPDATE_LEAVE}`,
      data,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const listAllLeaveService = async (
  page: number,
  search: string,
  status?: string,
) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.LIST_LEAVE}`,
      {
        params :{
          page,
          search,
          limit: 5,
          status,
        },
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};
