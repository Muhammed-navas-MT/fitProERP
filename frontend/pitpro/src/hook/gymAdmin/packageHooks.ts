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
} from "@/types/gymAdmin/packageTypes";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const PAKCAGE_QUERY_KEYS = {
  PACKAGES: "packages",
  PACKAGE: "package",
};

export const PACKAGE_QUERY_KEYS2 = {
  list: (page: number, search: string) =>
    ["packages", { page, search }] as const,

  view: (id: string) => ["package", id] as const,
};

export const useListPackages = (
  page: number,
  search: string,
  branchId?: string
) => {
  return useQuery({
    queryKey: [PAKCAGE_QUERY_KEYS.PACKAGES, page, search,branchId],
    queryFn: () => listPackagesService(page, search, branchId),
    placeholderData: keepPreviousData,
  });
};

export const useViewPackage = (packageId: string, enabled = true) => {
  return useQuery({
    queryKey: [PAKCAGE_QUERY_KEYS.PACKAGE, packageId],
    queryFn: () => viewPackageService(packageId),
    enabled: !!packageId && enabled,
  });
};

export const useCreatePackage = () => {
  return useMutation({
    mutationFn: (data: ICreatePackageType) => createPackageService(data),
  });
};

export const useUpdatePackage = (page: number, searchQuery: string, branchId:string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdatePackageType }) =>
      updatePackageService(id, data),

    onSuccess: (_, { id, data }) => {
      queryClient.setQueryData<IListPackagesType>(
        [PAKCAGE_QUERY_KEYS.PACKAGES, page, searchQuery,branchId],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: oldData.data.data.map((pkg: IListPackageItemType) =>
                pkg.id === id ? { ...pkg, ...data } : pkg
              ),
            },
          };
        }
      );

      queryClient.setQueryData(
        [PAKCAGE_QUERY_KEYS.PACKAGE, id],
        (oldPackage:IListPackageItemType) => {
          if (!oldPackage) return oldPackage;
          return { ...oldPackage, data: { ...oldPackage.data, ...data } };
        }
      );
      toast.success("Package updated successfully");
    },

    onError: (error) => {
      const message = error?.message || "Failed to update package";
      toast.error(message);
    },
  });
};


export const useBlockPackage = (page: number, searchQuery: string, branchId:string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => blockPackageService(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<IListPackagesType>(
        [PAKCAGE_QUERY_KEYS.PACKAGES, page, searchQuery,branchId],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: oldData.data.data.map((pkg: IListPackageItemType) =>
                pkg.id === id ? { ...pkg, isActive: false } : pkg
              ),
            },
          };
        }
      );
      toast.success("Package blocked successfully");
    },
    onError: (error) => {
      const message = error?.message || "Failed to block package";
      toast.error(message);
    },
  });
};

export const useUnBlockPackage = (page: number, searchQuery: string,branchId:string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => unBlockPackageService(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<IListPackagesType>(
        [PAKCAGE_QUERY_KEYS.PACKAGES, page, searchQuery,branchId],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: oldData.data.data.map((pkg: IListPackageItemType) =>
                pkg.id === id ? { ...pkg, isActive: true } : pkg
              ),
            },
          };
        }
      );
      toast.success("Package  unblocked successfully");
    },
    onError: (error) => {
      const message = error?.message || "Failed to  unblock package";
      toast.error(message);
    },
  });
};
