import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios";

export const profitAnalyticsService = async (
  startDate?: string,
  endDate?: string
) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.PROFIT}`,
      {
        params: {
          startDate,
          endDate,
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