import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios";

export const MarkAttendanceService = async ()=>{
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.MARK_ATTENDANCE}`
    );
    return response.data;
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data.message);
    };
    throw error;
  }
}

export const getTodayAttendanceService = async ()=>{
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.GET_ATTENDANCE}`
    );
    return response.data;
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data.message);
    };
    throw error;
  }
}

export const getAttendanceListService = async ()=>{
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.GET_ALL_ATTENDANCE}`
    );
    return response.data;
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data.message);
    };
    throw error;
  }
}

export const updateAttendanceService = async (id:string)=>{
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.CHECK_OUT_ATTENDANCE}`,
      {id}
    );
    return response.data;
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data.message);
    };
    throw error;
  }
}