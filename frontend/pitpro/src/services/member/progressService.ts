import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { ICreateProgressType, IUpdateProgressType } from "@/types/member/progressTypes";
import { AxiosError } from "axios";

export const listProgressService = async (page: number) => {
  const response = await AxiosInstance.get(
    `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.LIST_PROGRESS}?page=${page}&limit=5`
  );
  return response.data;
};

export const listProgressGraphDataService = async () => {
  const response = await AxiosInstance.get(
    `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.FIND_PROGRESS_GRAPH_DATA}`
  );
  return response.data;
};

export const createProgressService = async (data: ICreateProgressType) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.CREATE_PROGRESS}`,
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

export const findProgressService = async (progressId: string) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.FIND_PROGRESS}/${progressId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
    throw error;
  }
};

export const updateProgressService = async (
  id: string,
  data: IUpdateProgressType
) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.UPDATE_PROGRESS}/${id}`,
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
