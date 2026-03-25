import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios";

export const listSessionService = async (page:number,limit:number) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.LIST_SESSION}`,{
        params:{
            limit,
            page
        }
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