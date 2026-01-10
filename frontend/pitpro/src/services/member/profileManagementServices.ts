import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { UpdateMemberProfileFormValues } from "@/validation/updateMemberProfileValidation";
import { AxiosError } from "axios"

export const viewMemberProfileService = async()=>{
    try {
        const response = await AxiosInstance.get(`${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.VIEW_PROFILE}`);
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message);
        };
        throw error
    }
}

export const updateMemberProfileService = async(data:UpdateMemberProfileFormValues)=>{
    try {
        const response = await AxiosInstance.post(`${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.UPDATE_PROFILE}`,data);
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message);
        };
        throw error
    }
}

export const updateMemberPasswordService = async(data:{oldPassword:string,newPassword:string})=>{
    try {
        const response = await AxiosInstance.post(`${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.CHANGE_PASSWORD}`,data);
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message);
        };
        throw error
    }
}

export const uploacdProfilePicturedService = async (image: File) => {
    const formData = new FormData()
    formData.append("profileImg", image) 

  const response = await AxiosInstance.post(
    `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.UPLOAD_PROFILE_PICTURE}`,
    formData,
    {
        headers: {
          "Content-Type": "multipart/form-data",
        },
    }
  )

  return response.data
}


export const deleteProfilePicturedService = async()=>{
    try {
        const response = await AxiosInstance.put(`${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.DELETE_PROFILE_PICTURE}`);
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message);
        };
        throw error
    }
}
