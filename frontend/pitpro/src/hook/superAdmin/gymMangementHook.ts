import { approveGym, blockGym, findGymDetail, getGyms, rejectGym, unBlockGym } from "@/services/superAdmin/gymMangementService";
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

export const useFindGym = (gymId:string)=>{
  return useQuery({
    queryKey:["gymDetail",gymId],
    queryFn:()=>findGymDetail(gymId)
  })
};

export const useApproveGym = () => {
  return useMutation({
    mutationFn: (gymId: string) => approveGym(gymId),
  });
};

export const useRejectGym = () => {
  return useMutation({
    mutationFn:(data:{gymId: string,reason:string}) => rejectGym(data.gymId,data.reason),
  });
};