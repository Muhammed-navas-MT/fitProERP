import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios";

export const verifyTrainerEmailService = async (email:string) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.VERIFY_EMAIL}`,{email},
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const verifyTrainerOtpService = async (data:{email:string,otp:number}) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.VERIFY_OTP}`,data,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const trainerNewpasswordService = async (data:{email:string,password:string}) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.NEW_PASSWORD}`,data,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};
