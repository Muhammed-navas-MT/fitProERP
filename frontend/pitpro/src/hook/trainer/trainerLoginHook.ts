import { trainerLoginService } from "@/services/trainer/trainerLoginService"
import { LoginPayload } from "@/types/authPayload"
import { useMutation } from "@tanstack/react-query"

export const useTrainerLogin = ()=>{
    return useMutation({
        mutationFn:(data:LoginPayload)=>trainerLoginService(data)
    })
};
