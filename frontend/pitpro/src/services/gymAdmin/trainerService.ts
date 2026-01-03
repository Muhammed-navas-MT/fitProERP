import { API_ROUTES } from "@/constants/apiRoutes";
import AxiosInstance from "@/axios/axios";
import { TrainerAddPayload } from "@/types/authPayload";
import { AxiosError } from "axios";
import { UpdateTrainerType } from "@/types/updateTrainerType";

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

export const updateTrainerService = async (
  trainerId: string,
  data:UpdateTrainerType
) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.UPDATE_TRAINER}/${trainerId}`,
      data
    )

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Update trainer failed")
    }
    throw error
  }
}

export const findTrainerService = async (trainerId: string) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.FIND_TRAINER}/${trainerId}`
    )

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to fetch trainer")
    }
    throw error
  }
}

export const blockTrainerService = async (trainerId: string) => {
  try {
    const response = await AxiosInstance.put(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.BLOCK_TRAINER}/${trainerId}`
    )

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to block trainer")
    }
    throw error
  }
}

export const unblockTrainerService = async (trainerId: string) => {
  try {
    const response = await AxiosInstance.put(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.UNBLOCK_TRAINER}/${trainerId}`
    )

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to unblock trainer")
    }
    throw error
  }
}


