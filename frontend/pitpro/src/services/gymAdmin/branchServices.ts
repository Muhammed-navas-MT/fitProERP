import AxiosInstance from "@/axios/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { ICreateBranchType, IUpdateBranchType } from "@/types/gymAdmin/createBranchType";
import { AxiosError } from "axios";

export const createBranchService = async (data:ICreateBranchType)=>{
    try {
        const response = await AxiosInstance.post(`${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.CREATE_BRANCH}`,data);
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message);
        };
        throw error;
    }
}

export const blockBranchService = async (branchId:string)=>{
    try {
        const response = await AxiosInstance.put(`${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.BLOCK_BRANCH}/${branchId}`);
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message);
        };
        throw error;
    }
}

export const unBlockBranchService = async (branchId:string)=>{
    try {
        const response = await AxiosInstance.put(`${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.UNBLOCK_BRANCH}/${branchId}`);
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message);
        };
        throw error;
    }
}

export const findBranchService = async (branchId:string)=>{
    try {
        const response = await AxiosInstance.get(`${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.FIND_BRANCH}/${branchId}`);
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message);
        };
        throw error;
    }
}

export const listBranchService = async (page: number, search: string)=>{
    try {
        const response = await AxiosInstance.get(`${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.LIST_BRANCH}?&page=${page}&limit=5&search=${search}`);
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message);
        };
        throw error;
    }
}

export const updateBranchService = async (data:IUpdateBranchType,branchId:string)=>{
    try {
        const response = await AxiosInstance.post(`${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.UPDATE_BRANCH}/${branchId}`,data);
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message);
        };
        throw error;
    }
}

export const listActiveBranch = async()=>{
    try {
        const response = await AxiosInstance.get(`${API_ROUTES.GYMADMIN.BASE}${API_ROUTES.GYMADMIN.LIST_ACTIVE_BRANCH}`);
        return response.data
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message);
        };
        throw error
    }
}