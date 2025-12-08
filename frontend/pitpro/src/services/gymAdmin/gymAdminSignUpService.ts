import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";

export const signupGymAdmin = async (data: FormData) => {

  const response = await AxiosInstance.post(
    `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.AUTH.SIGNUP}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const emailVerifincation = async (email:string) => {
  const response = await AxiosInstance.post(`${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.AUTH.EMAIL_VERIFY}`,email);
  return response;
}

export const otpVerification = async (otp:string) => {
  const response = await AxiosInstance.post(`${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.AUTH.OTP_VERIFY}`,otp);
  return response;
}
