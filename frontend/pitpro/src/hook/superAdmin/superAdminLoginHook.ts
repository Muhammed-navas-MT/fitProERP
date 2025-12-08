import { useMutation } from "@tanstack/react-query";
import { LoginPayload } from "@/types/authPayload";
import { superAdminLoginService } from "@/services/superAdmin/superAdminLoginService";

export const useSuperAdminLogin = ()=>{
    return useMutation({
        mutationFn:(data:LoginPayload) =>superAdminLoginService(data),
    })
}