import AxiosInstance from "@/axios/axios";
import { AxiosError } from "axios";
import { API_ROUTES } from "@/constants/apiRoutes";

export const reUploadDocument = async (data: FormData) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.REAPPLY}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    }
    throw error;
  }
};