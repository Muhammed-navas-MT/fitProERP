import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { ICreatePackageType, IUpdatePackageType } from "@/types/gymAdmin/packageTypes";
import { AxiosError } from "axios";

export const listPackagesService = async (page: number, search: string,branchId?:string) => {
  const response = await AxiosInstance.get(
    `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.LIST_PACKAGE}?page=${page}&limit=5&search=${search}&branchId=${branchId}`
  );
  return response.data;
};

export const createPackageService = async (data: ICreatePackageType) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.CREATE_PACKAGE}`,
      data
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error
  }
};

export const blockPackageService = async (packageId: string) => {
  try {
    const response = await AxiosInstance.put(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.BLOCK_PACKAGE}/${packageId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
    throw error;
  }
};

export const unBlockPackageService = async (packageId: string) => {
  try {
    const response = await AxiosInstance.put(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.UNBLOCK_PACKAGE}/${packageId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
    throw error;
  }
};

export const viewPackageService = async (packageId: string) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.FIND_PACKAGE}/${packageId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
    throw error;
  }
};

export const updatePackageService = async (
  id: string,
  data: IUpdatePackageType
) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.UPDATE_PACKAGE}/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    }
    throw error;
  }
};
