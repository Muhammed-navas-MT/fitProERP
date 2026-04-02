import { findAssignedTrainerService, listActiveTrainerService } from "@/services/member/trainerServices"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export const useGetActiveTrainers = ()=>{
    return useQuery({
        queryKey:["active_trainers"],
        queryFn :()=>listActiveTrainerService(),
        placeholderData:keepPreviousData
    })
}

export const useFindAssignedTrainers = ()=>{
    return useQuery({
        queryKey:["assigned_trainer"],
        queryFn :()=>findAssignedTrainerService(),
        placeholderData:keepPreviousData,

    })
}