import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios";

export const verifyGymAdminEmailService = async (email:string) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.VERIFY_EMAIL}`,{email},
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const verifyGymAdminOtpService = async (data:{email:string,otp:number}) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.VERIFY_OTP}`,data,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const gymAdminNewpasswordService = async (data:{email:string,password:string}) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.NEW_PASSWORD}`,data,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};
