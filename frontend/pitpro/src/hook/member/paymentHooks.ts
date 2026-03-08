import { listAllPaymentsService } from "@/services/member/paymentSevice"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export const useGetAllPayments = (page:number,search:string,sourceType?:string)=>{
    return useQuery({
        queryKey:["payments",page,search,sourceType],
        queryFn :()=>listAllPaymentsService(page,search,sourceType),
        placeholderData:keepPreviousData
    })
}