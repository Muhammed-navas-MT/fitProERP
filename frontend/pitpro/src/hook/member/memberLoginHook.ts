import { memberLoginService } from "@/services/member/memberLoginService";
import { LoginPayload } from "@/types/authPayload"
import { useMutation } from "@tanstack/react-query"

export const useMemberLogin = ()=>{
    return useMutation({
        mutationFn:(data:LoginPayload)=>memberLoginService(data)
    })
};
