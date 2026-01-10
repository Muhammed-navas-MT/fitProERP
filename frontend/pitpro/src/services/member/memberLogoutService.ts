import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios";

export const memberLogoutService = async () => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.LOGOUT}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Logout failed",
      );
    }
    throw new Error("Something went wrong");
  }
};
