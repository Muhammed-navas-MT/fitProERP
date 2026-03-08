import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios";

export const listAllPaymentsService = async (
  page: number,
  search: string,
  sourceType?: string,
) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.MEMBER.BASE}${API_ROUTES.MEMBER.LIST_PAYMENTS}`,
      {
        params: {
          page,
          limit: 5,
          search,
          sourceType,
        },
      },
    );
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
};
