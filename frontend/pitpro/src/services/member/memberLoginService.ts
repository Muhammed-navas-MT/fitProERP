import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { LoginPayload } from "@/types/authPayload";
import { AxiosError } from "axios";

export const memberLoginService = async (data:LoginPayload)=>{
    try {
        const response = await AxiosInstance.post(`${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.LOGIN}`,data);
        console.log(response,"in member login....");
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message);
        };
        throw error;
    }
}