import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import type { LoginPayload } from "@/types/authPayload";

export const gymAdminLogin = async (data:LoginPayload)=>{
    const response = await AxiosInstance.post(API_ROUTES.GYMADMIN.AUTH.LOGIN,data);
    return response;
}