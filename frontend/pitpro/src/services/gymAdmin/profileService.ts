import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios";

export const viewGymAdminProfileService = async () => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.VIEW_PROFILE}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const updateGymAdminProfileService = async (
  data: FormData
) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.UPDATE_PROFILE}`,
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
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const updateGymAdminPasswordService = async (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.CHANGE_PASSWORD}`,
      data
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};
