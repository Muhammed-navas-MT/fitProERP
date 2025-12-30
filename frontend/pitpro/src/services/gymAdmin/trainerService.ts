import { API_ROUTES } from "@/constants/apiRoutes";
import AxiosInstance from "@/axios/axios";
import { TrainerAddPayload } from "@/types/authPayload";
import { AxiosError } from "axios";

export const addTrainerService = async (data: TrainerAddPayload) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.CREATE_TRAINER}`,
      data
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error( error.response?.data.message);
    }
    throw error;
  }
};

export const getTrainers = async (page: number, search: string,gymId:string) => {
  const response = await AxiosInstance.get(
    `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.LISTTRAINER}?page=${page}&limit=5&search=${search}&gymId=${gymId}`
  );
  return response.data;
};
