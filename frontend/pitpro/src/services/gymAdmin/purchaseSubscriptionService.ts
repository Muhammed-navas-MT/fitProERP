import AxiosInstance from "@/axios/axios"
import { API_ROUTES } from "@/constants/apiRoutes"
import { PurchaseSubscriptionPayload } from "@/types/purchaseSubcription"
import { AxiosError } from "axios"

export const PurchaseSubscriptionService2 = async (data:PurchaseSubscriptionPayload)=>{
    try {
        const response = await AxiosInstance.post(`${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.PURCHASESUBSCRIPTION}`,data);
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message);
        };
        throw error
    }
}