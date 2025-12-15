import { API_ROUTES } from "@/constants/apiRoutes";
import AxiosInstance from "@/axios/axios";
import { TrainerAddPayload } from "@/types/authPayload";
import { AxiosError } from "axios";

export const addTrainerService = async (data: TrainerAddPayload) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.AUTH.SIGNUP}`,
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

export const getTrainers = async (page: number, search: string) => {
  const response = await AxiosInstance.get(
    `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.AUTH.LISTTRAINER}?page=${page}&'limit'=5&search=${search}`
  );
  return response.data;
};
