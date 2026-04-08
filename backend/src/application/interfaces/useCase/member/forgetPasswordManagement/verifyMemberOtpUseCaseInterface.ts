export interface IVerifyMemberOtpUseCase {
  execute(data: { email: string; otp: string }): Promise<void>;
}
