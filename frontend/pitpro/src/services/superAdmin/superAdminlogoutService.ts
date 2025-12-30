import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios";

export const superAdminLogoutService = async () => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.SUPERADMIN.BASE}${API_ROUTES.SUPERADMIN.LOGOUT}`,
    );
    console.log("data form super admin logout.. ",response);
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
