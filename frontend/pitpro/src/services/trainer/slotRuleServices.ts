import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { CreateSlotRuleDTO } from "@/types/trainer/slotRuleType";
import { AxiosError } from "axios";

export const createSlotRuleService = async (data:CreateSlotRuleDTO)=>{
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.CREATE_SLOT_RULE}`,
      data
    );
    return response.data;
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data.message);
    };
    throw error;
  }
}