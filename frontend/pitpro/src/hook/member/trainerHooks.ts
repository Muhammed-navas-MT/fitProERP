import { listActiveTrainerService } from "@/services/member/trainerServices"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export const useGetActiveTrainers = ()=>{
    return useQuery({
        queryKey:["active_trainers"],
        queryFn :()=>listActiveTrainerService(),
        placeholderData:keepPreviousData
    })
}