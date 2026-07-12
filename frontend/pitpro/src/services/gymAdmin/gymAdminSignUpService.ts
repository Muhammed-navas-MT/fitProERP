import AxiosInstance from "@/axios/axios";
import { AxiosError } from "axios";
import { API_ROUTES } from "@/constants/apiRoutes";

export const signupGymAdmin = async (data: FormData) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.AUTH.SIGNUP}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    }
    throw error;
  }
};

export const gymInfoService = async (data: FormData) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.AUTH.GYM_INFO}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    }
    throw error;
  }
};

export const emailVerifincation = async (data: {
  email: string;
  ownerName: string;
  phone: string;
  password: string;
  confirmPassword: string;
  signupId?: string;
}) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.AUTH.EMAIL_VERIFY}`,
      data,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    }
    throw error;
  }
};

export const otpVerification = async (data: {
  signupId: string;
  otp: string;
  email: string;
}) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.AUTH.OTP_VERIFY}`,
      data,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    }
    throw error;
  }
};

export const resendOtpService = async(signupId: string) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.AUTH.RESEND_OTP}`,
      { signupId },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const resumeRegistrationService = async(signupId: string) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.AUTH.RESUME}/${signupId}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};
