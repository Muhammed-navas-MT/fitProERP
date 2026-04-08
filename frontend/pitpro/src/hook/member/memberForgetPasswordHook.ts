import { newMemberpasswordService, verifyMemberEmailService, verifyMemberOtpService } from "@/services/member/memberForgetPasswordService";
import { useMutation } from "@tanstack/react-query"

export const useMemberEmail = ()=>{
    return useMutation({
        mutationFn:(email:string)=>verifyMemberEmailService(email)
    })
};

export const useMemberOtp = ()=>{
    return useMutation({
        mutationFn:(data:{email:string,otp:number})=>verifyMemberOtpService(data),
    })
};

export const useMemberNewPassword = ()=>{
    return useMutation({
        mutationFn:(data:{email:string,password:string})=>newMemberpasswordService(data),
    })
};
