import { findAssignedTrainerService, listActiveTrainerService } from "@/services/member/trainerServices"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export const useGetActiveTrainers = ()=>{
    return useQuery({
        queryKey:["active_trainers"],
        queryFn :()=>listActiveTrainerService(),
        placeholderData:keepPreviousData
    })
}

export const useFindAssignedTrainers = (memberId:string)=>{
    return useQuery({
        queryKey:["assigned_trainer",memberId],
        queryFn :()=>findAssignedTrainerService(),
        placeholderData:keepPreviousData,
        refetchOnWindowFocus: false, 
        enabled: !!memberId,

    })
}