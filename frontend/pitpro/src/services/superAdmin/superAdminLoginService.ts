import { LoginPayload } from "@/types/authPayload";
import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios";

export const superAdminLoginService = async (data: LoginPayload) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.SUPERADMIN.BASE}${API_ROUTES.SUPERADMIN.LOGIN}`,
      data
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
};
