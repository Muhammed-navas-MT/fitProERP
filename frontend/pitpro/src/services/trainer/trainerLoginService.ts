import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { LoginPayload } from "@/types/authPayload";
import { AxiosError } from "axios";

export const trainerLoginService = async (data:LoginPayload)=>{
    try {
        const response = await AxiosInstance.post(`${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.AUTH.LOGIN}`,data);
        console.log(response);
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message);
        };
        throw error;
    }
}