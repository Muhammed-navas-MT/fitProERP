import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios";

export const listPaymentsService = async (page: number, search: string) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.SUPERADMIN.BASE}${API_ROUTES.SUPERADMIN.LIST_PAYMENTS}`,
      {
        params: {
          page,
          limit: 5,
          search,
        },
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const findPaymentService = async (paymentId: string) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.SUPERADMIN.BASE}${API_ROUTES.SUPERADMIN.PAYMENT_DETAIL}/${paymentId}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};
