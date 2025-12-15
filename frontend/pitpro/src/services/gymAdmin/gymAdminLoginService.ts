import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import type { LoginPayload } from "@/types/authPayload";
import { AxiosError } from "axios";

export const gymAdminLogin = async (data:LoginPayload)=>{
    try {
        const response = await AxiosInstance.post(`${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.AUTH.LOGIN}`,data);
        console.log(response,"from gym admin login")
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message);
        };
        throw error;
    }
}