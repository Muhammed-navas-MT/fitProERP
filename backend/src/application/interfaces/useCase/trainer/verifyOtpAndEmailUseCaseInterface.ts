import { IVerifyEmailRequestDTO, IVerifyOtpRequestDTO } from "../../../dtos/auth/verifyOtpDto";

export interface IVerifyEmailAndOtpUseCase {
    signUpSendOtp(data:IVerifyEmailRequestDTO):Promise<void>;
    verify(data:IVerifyOtpRequestDTO):Promise<void>;
}