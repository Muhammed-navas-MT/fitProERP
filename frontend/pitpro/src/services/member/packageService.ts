import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios";

export const listAllActivePackages = async () => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.LIST_ACTIVE_PACKAGES}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};
