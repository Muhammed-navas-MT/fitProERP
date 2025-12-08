import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";

export const listSubscription = async ()=>{
    const response = await AxiosInstance.get(`${API_ROUTES.SUPERADMIN.BASE}${API_ROUTES.SUPERADMIN.LIST_SUBSCRIPTION}`);
    return response.data.data;
}