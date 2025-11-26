import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import type { SignupPayload } from "@/types/authPayload";

export const signupGymAdmin = async (data:SignupPayload)=>{
    console.log(data)
    const response = await AxiosInstance.post(`${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.AUTH.SIGNUP}`,data);
    console.log("response data from signup ", response.data);
    return response.data;
}