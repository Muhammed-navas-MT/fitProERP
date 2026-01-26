import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { AxiosError } from "axios";
import { MemberAddPayload, MemberUpdatePayload } from "@/types/authPayload";

export const createMemberService = async (data: MemberAddPayload) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.CREATE_MEMBER}`,
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

export const listMemberService = async (
  page: number,
  search: string,
  branchId?: string
) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.LISTMEMBER}?page=${page}&limit=5&search=${search}&branchId=${branchId ?? ""}`
    );
    console.log(response)
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const findMemberService = async (memberId: string) => {
  try {
    const response = await AxiosInstance.get(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.FIND_MEMBER}/${memberId}`
    );
    console.log(response.data,"find member service...")
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const updateMemberService = async (
  data:MemberUpdatePayload,
  memberId: string
) => {
  try {
    const response = await AxiosInstance.post(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.UPDATE_MEMBER}/${memberId}`,
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

export const blockMemberService = async (memberId: string) => {
  try {
    const response = await AxiosInstance.put(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.BLOCK_MEMBER}/${memberId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const unBlockMemberService = async (memberId: string) => {
  try {
    const response = await AxiosInstance.put(
      `${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.UNBLOCK_MEMBER}/${memberId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};
