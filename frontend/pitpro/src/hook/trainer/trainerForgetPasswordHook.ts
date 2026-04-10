import { trainerNewpasswordService, verifyTrainerEmailService, verifyTrainerOtpService } from "@/services/trainer/trainerForgetPasswordService";
import { useMutation } from "@tanstack/react-query"

export const useTrainerEmail = ()=>{
    return useMutation({
        mutationFn:(email:string)=>verifyTrainerEmailService(email)
    })
};

export const useTrainerOtp = ()=>{
    return useMutation({
        mutationFn:(data:{email:string,otp:number})=>verifyTrainerOtpService(data),
    })
};

export const useTrainerNewPassword = ()=>{
    return useMutation({
        mutationFn:(data:{email:string,password:string})=>trainerNewpasswordService(data),
    })
};
