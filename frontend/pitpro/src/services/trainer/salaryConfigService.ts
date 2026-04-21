import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { SalaryPaymentMethod } from "@/types/trainer/salarypaymentMethod";
import { AxiosError } from "axios";

export const createTrainerStripeOnboardingLinkService = async (data: {
  refreshUrl: string;
  returnUrl: string;
}) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.CREATE_STRIPE_ONBOARDING_LING}`,
      data,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.messages);
    }
    throw error;
  }
};

export const getTrainerSalaryconfigService = async () => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.GET_SALARY_CONFING}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.messages);
    }
    throw error;
  }
};

export const refreshTrainerStripeStatusService = async () => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.REFRESH_STRIPE_STATUS}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.messages);
    }
    throw error;
  }
};

export const updateTrainerSalaryconfigService = async (data: {
  paymentType: SalaryPaymentMethod;
  accountHolderName?: string;
  ifscCode?: string;
  upiId?: string;
}) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.UPDATE_SALARY_CONFIG}`,
      data,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.messages);
    }
    throw error;
  }
};

export const viewSalaryDetailService = async (salaryId: string) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.VIEW_SALARY}/${salaryId}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.messages);
    }
    throw error;
  }
};

export const listAllSalaryService = async (data: {
  page: number;
  limit: number;
}) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.TRAINER.BASE}${API_ROUTES.TRAINER.LIST_ALL_SALARIES}`,
      { params: data },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.messages);
    }
    throw error;
  }
};
