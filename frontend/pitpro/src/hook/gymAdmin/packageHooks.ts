import {
  listPackagesService,
  createPackageService,
  updatePackageService,
  blockPackageService,
  unBlockPackageService,
  viewPackageService,
} from "@/services/gymAdmin/packageService";

import {
  ICreatePackageType,
  IListPackageItemType,
  IListPackagesType,
  IUpdatePackageType,
  IViewPackageType,
} from "@/types/gymAdmin/packageTypes";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

export const PACKAGE_QUERY_KEYS = {
  PACKAGES: "packages",
  PACKAGE: "package",
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

type ListPackagesResponse = ApiResponse<IListPackagesType>;
type ViewPackageResponse = ApiResponse<IViewPackageType>;

export const useListPackages = (
  page: number,
  search: string,
  branchId?: string,
) => {
  return useQuery<ListPackagesResponse>({
    queryKey: [PACKAGE_QUERY_KEYS.PACKAGES, page, search, branchId],
    queryFn: () => listPackagesService(page, search, branchId),
    placeholderData: keepPreviousData,
  });
};

export const useViewPackage = (packageId: string, enabled = true) => {
  return useQuery<ViewPackageResponse>({
    queryKey: [PACKAGE_QUERY_KEYS.PACKAGE, packageId],
    queryFn: () => viewPackageService(packageId),
    enabled: !!packageId && enabled,
  });
};

export const useCreatePackage = () => {
  return useMutation({
    mutationFn: (data: ICreatePackageType) => createPackageService(data),
  });
};

export const useUpdatePackage = (
  page: number,
  searchQuery: string,
  branchId?: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdatePackageType }) =>
      updatePackageService(id, data),

    onSuccess: (_, { id, data }) => {
      queryClient.setQueryData<ListPackagesResponse>(
        [PACKAGE_QUERY_KEYS.PACKAGES, page, searchQuery, branchId],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: oldData.data.data.map((pkg: IListPackageItemType) =>
                pkg.id === id ? { ...pkg, ...data } : pkg,
              ),
            },
          };
        },
      );

      queryClient.setQueryData<ViewPackageResponse>(
        [PACKAGE_QUERY_KEYS.PACKAGE, id],
        (oldPackage) => {
          if (!oldPackage) return oldPackage;

          return {
            ...oldPackage,
            data: {
              ...oldPackage.data,
              ...data,
            },
          };
        },
      );

      toast.success("Package updated successfully");
    },

    onError: (error: Error) => {
      toast.error(error.message || "Failed to update package");
    },
  });
};

export const useBlockPackage = (
  page: number,
  searchQuery: string,
  branchId?: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => blockPackageService(id),

    onSuccess: (_, id) => {
      queryClient.setQueryData<ListPackagesResponse>(
        [PACKAGE_QUERY_KEYS.PACKAGES, page, searchQuery, branchId],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: oldData.data.data.map((pkg) =>
                pkg.id === id ? { ...pkg, isActive: false } : pkg,
              ),
            },
          };
        },
      );

      queryClient.setQueryData<ViewPackageResponse>(
        [PACKAGE_QUERY_KEYS.PACKAGE, id],
        (oldPackage) => {
          if (!oldPackage) return oldPackage;

          return {
            ...oldPackage,
            data: {
              ...oldPackage.data,
              isActive: false,
            },
          };
        },
      );

      toast.success("Package blocked successfully");
    },

    onError: (error: Error) => {
      toast.error(error.message || "Failed to block package");
    },
  });
};

export const useUnBlockPackage = (
  page: number,
  searchQuery: string,
  branchId?: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => unBlockPackageService(id),

    onSuccess: (_, id) => {
      queryClient.setQueryData<ListPackagesResponse>(
        [PACKAGE_QUERY_KEYS.PACKAGES, page, searchQuery, branchId],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: oldData.data.data.map((pkg) =>
                pkg.id === id ? { ...pkg, isActive: true } : pkg,
              ),
            },
          };
        },
      );

      queryClient.setQueryData<ViewPackageResponse>(
        [PACKAGE_QUERY_KEYS.PACKAGE, id],
        (oldPackage) => {
          if (!oldPackage) return oldPackage;

          return {
            ...oldPackage,
            data: {
              ...oldPackage.data,
              isActive: true,
            },
          };
        },
      );

      toast.success("Package unblocked successfully");
    },

    onError: (error: Error) => {
      toast.error(error.message || "Failed to unblock package");
    },
  });
};