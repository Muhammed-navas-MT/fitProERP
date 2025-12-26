import AxiosInstance from "@/axios/axios"
import { API_ROUTES } from "@/constants/apiRoutes"

export const listAllActiveSubscription = async ()=>{
    const response = await AxiosInstance.get(`${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.LISTSUBSCRIPTION}`);
    console.log(response,"From listing active subscription...");
    return response.data;
}