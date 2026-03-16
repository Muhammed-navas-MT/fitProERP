import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios";

export const createDietPlanService = async()=>{
    try {
        const response = await AxiosInstance.post(`${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.CREATE_DIET}`);
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message);
        };
        throw error
    }
}

export const listDietPlanService = async () => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.LIST_DIET}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};
