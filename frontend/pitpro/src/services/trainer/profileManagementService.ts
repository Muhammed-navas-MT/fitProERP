import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { UpdateTrainerProfileInput } from "@/validation/updateTrainerProfileValidation";
import { AxiosError } from "axios"

export const viewTrainerProfileService = async()=>{
    try {
        const response = await AxiosInstance.get(`${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.VIEW_PROFILE}`);
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message);
        };
        throw error
    }
}

export const updateTrainerProfileService = async(data:UpdateTrainerProfileInput)=>{
    try {
        const response = await AxiosInstance.post(`${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.UPDATE_PROFILE}`,data);
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message);
        };
        throw error
    }
}

export const updateTrainerPasswordService = async(data:{oldPassword:string,newPassword:string})=>{
    try {
        const response = await AxiosInstance.post(`${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.CHANGE_PASSWORD}`,data);
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message);
        };
        throw error
    }
}