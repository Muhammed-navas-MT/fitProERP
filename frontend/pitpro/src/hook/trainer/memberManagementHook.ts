import { addMemberService, getAllActiveTrainers, getMembersService } from "@/services/trainer/memberService";
import { MemberAddPayload } from "@/types/authPayload";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllMembers = (
  page: number,
  search: string,
  trainerId: string,
) => {
  return useQuery({
    queryKey: ["members", page, search,trainerId],
    queryFn: () => getMembersService(page,search,trainerId),
    placeholderData: keepPreviousData,
  });
};

export const useAddMember = ()=>{
  return useMutation({
    mutationFn:(data:MemberAddPayload) => addMemberService(data)
  })
};

export const useGetAllActiveTrainers = () => {
  return useQuery({
    queryKey: ["active-trainers"],
    queryFn: getAllActiveTrainers,
  })
}