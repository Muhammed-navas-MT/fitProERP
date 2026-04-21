import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios";

export const generateTrainerSalaryService = async () => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.GENERATE_TRAINER_SALARY}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const listTrainerSalaryService = async (params: {
  page: number;
  limit: number;
}) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.LIST_TRAINER_SALARY}`,
      { params },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const createBillingSetupIntentService = async () => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.CREATE_BILLING_SETUP_INTENT}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const getBillingConfigService = async () => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.GET_BILLING_CONFIG}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const saveBillingEmailService = async (billingEmail: string) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.SAVE_BILLING_EMAIL}`,
      { billingEmail },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const saveBillingPaymentMethodService = async (data: {
  paymentMethodId: string;
  billingEmail: string;
}) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.SAVE_PAYMENT_METHOD}`,
      data,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const payTrainerSalaryService = async (salaryId: string) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.PAY_TRAINER_SALARY}/${salaryId}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};
export const findSalaryDetailService = async (salaryId: string) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.FIND_SALARY_DETAIL}/${salaryId}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

