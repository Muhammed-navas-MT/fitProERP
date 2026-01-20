import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios";

export const checkoutPackageService = async (planId:string) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.CHECKOUT}`,
      {planId}
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Payment failed");
    }
    throw error;
  }
};
