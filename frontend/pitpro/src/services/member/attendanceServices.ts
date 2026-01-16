import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios";

export const MarkAttendanceService = async ()=>{
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.MARK_ATTENDANCE}`
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
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.GET_ATTENDANCE}`
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
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.GET_ALL_ATTENDANCE}`
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
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.CHECK_OUT_ATTENDANCE}`,
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

export const getCurrentMonthAttendanceService = async ()=>{
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.GET_CURRENT_MONTH_ATTENDANCE}`
    );
    return response.data;
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data.message);
    };
    throw error;
  }
}