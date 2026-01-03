import { useQuery, useMutation, keepPreviousData } from "@tanstack/react-query";
import {
  createBranchService,
  blockBranchService,
  unBlockBranchService,
  findBranchService,
  listBranchService,
  updateBranchService,
  listActiveBranch,
} from "@/services/gymAdmin/branchServices";
import {
  ICreateBranchType,
  IUpdateBranchType,
} from "@/types/gymAdmin/createBranchType";

export const useListBranch = (
  page: number,
  search: string
) => {
  return useQuery({
    queryKey: ["branches", page, search],
    queryFn: () => listBranchService( page, search),
    placeholderData: keepPreviousData,
  });
};

export const useCreateBranch = () => {
  return useMutation({
    mutationFn: (data: ICreateBranchType) =>
      createBranchService(data),
  });
};

export const useFindBranch = (branchId: string) => {
  return useQuery({
    queryKey: ["branch", branchId],
    queryFn: () => findBranchService(branchId),
    enabled: !!branchId,
  });
};

export const useUpdateBranch = () => {
  return useMutation({
    mutationFn: ({
      branchId,
      updateData,
    }: {
      branchId: string;
      updateData: IUpdateBranchType;
    }) => updateBranchService(updateData, branchId),
  });
};

export const useBlockBranch = () => {
  return useMutation({
    mutationFn: (branchId: string) =>
      blockBranchService(branchId),
  });
};

export const useUnBlockBranch = () => {
  return useMutation({
    mutationFn: (branchId: string) =>
      unBlockBranchService(branchId),
  });
};

export const useListActiveBranch = () => {
  return useQuery({
    queryKey: ["active-branches"],
    queryFn: listActiveBranch,
  });
};
