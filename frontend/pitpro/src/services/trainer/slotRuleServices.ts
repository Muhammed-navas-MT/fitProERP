import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { CreateSlotRuleDTO, UpdateSlotRuletDto } from "@/types/trainer/slotRuleType";
import { AxiosError } from "axios";

export const createSlotRuleService = async (data: CreateSlotRuleDTO) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.CREATE_SLOT_RULE}`,
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

export const findSlotRuleService = async () => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.FIND_SLOT_RULE}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const updateSlotRuleService = async (
  data: UpdateSlotRuletDto,
  slotRuleId: string,
) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.UPDATE_SLOT_RULE}/${slotRuleId}`,
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

export const listSlotService = async () => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.LIST_SLOTS}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};
