import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios";

export const verifyMemberEmailService = async (email:string) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.VERIFY_EMAIL}`,{email},
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const verifyMemberOtpService = async (data:{email:string,otp:number}) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.VERIFY_OTP}`,data,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const newMemberpasswordService = async (data:{email:string,password:string}) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.NEW_PASSWORD}`,data,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};
