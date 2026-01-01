import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { MemberAddPayload } from "@/types/authPayload";
import { AxiosError } from "axios";

export const getMembersService = async (page: number, search: string,trainerId:string) => {
  const response = await AxiosInstance.get(
    `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.LIST_MEMBER}?page=${page}&limit=5&search=${search}&trainerId=${trainerId}`
  );
  return response.data;
};


export const addMemberService = async (data:MemberAddPayload)=>{
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.ADD_MEMBER}`,
      data
    );
    return response.data;
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data.message);
    };
    throw error;
  }
}

export const getAllActiveTrainers = async ()=>{
    try {
        const response = await AxiosInstance.get(`${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.LIST_ACTIVE_TRAINER}`);
        console.log(response)
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message);
        };
        throw error;
    }
}