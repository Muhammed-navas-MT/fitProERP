import { verifyGymAdminEmailService,gymAdminNewpasswordService,verifyGymAdminOtpService } from "@/services/gymAdmin/gymAdminForgetPasswordService";
import { useMutation } from "@tanstack/react-query"

export const useGymAdminEmail = ()=>{
    return useMutation({
        mutationFn:(email:string)=>verifyGymAdminEmailService(email)
    })
};

export const useGymAdminOtp = ()=>{
    return useMutation({
        mutationFn:(data:{email:string,otp:number})=>verifyGymAdminOtpService(data),
    })
};

export const useGymAdminNewPassword = ()=>{
    return useMutation({
        mutationFn:(data:{email:string,password:string})=>gymAdminNewpasswordService(data),
    })
};
