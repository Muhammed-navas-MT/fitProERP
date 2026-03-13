import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios";

export const rejectLeaveService = async (leaveId:string,reason:string) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.REJECT_LEAVE}/${leaveId}`,
      {reason},
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const findLeaveService = async (leaveId: string) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.FIND_LEAVE}/${leaveId}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const approveLeaveService = async (leaveId:string) => {
  try {
    const response = await AxiosInstance.put(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.APPROVE_LEAVE}/${leaveId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const listAllLeaveService = async (
  page: number,
  search: string,
  branchId?: string,
  status?: string,
) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.LIST_LEAVE}`,
      {
        params :{
          page,
          search,
          limit: 5,
          branchId,
          status,
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
