import { blockGym, getGyms, unBlockGym } from "@/services/superAdmin/gymMangementService";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

export const useGetGyms = (page: number, search: string) => {
  return useQuery({
    queryKey: ["gyms", page, search],
    queryFn: () => getGyms(page, search),
    placeholderData: keepPreviousData,
  });
};

export const useUnBlockGym = () => {
  return useMutation({
    mutationFn: (gymId: string) => unBlockGym(gymId),
  });
};

export const useBlockGym = () => {
  return useMutation({
    mutationFn: (gymId: string) => blockGym(gymId),
  });
};

