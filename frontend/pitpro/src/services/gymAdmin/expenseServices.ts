import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { ExpenseType } from "@/constants/expenseTypes";
import { ExpenseFormData, UpdateExpenseFormData } from "@/validation/expenseValidationSchema";
import { AxiosError } from "axios";


export const createExpenseService = async (expense:ExpenseFormData) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.CREATE_EXPENSE}`,expense,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const updateExpenseService = async (expense:UpdateExpenseFormData,expenseId:string) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.UPDATE_EXPENSE}/${expenseId}`,expense,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const listExpenseService = async (page: number, search: string, expenseType?:ExpenseType) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.LIST_EXPENSE}`,
      {
        params: {
          page,
          limit: 5,
          search,
          expenseType
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

export const findExpenseService = async (expenseId: string) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.FIND_EXPENSE}/${expenseId}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const findExpenseDetailService = async (expenseId: string) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.FIND_EXPENSE_DETAIL}/${expenseId}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};
