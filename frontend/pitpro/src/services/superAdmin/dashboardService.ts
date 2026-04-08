import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios"

export const getDashboardDetailService = async ()=>{
    try {
        const response = await AxiosInstance.get(`${API_ROUTES.SUPERADMIN.BASE}${API_ROUTES.SUPERADMIN.GET_DASHBOARD_DETAILS}`);
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message)
        }
        throw error;
    }
}