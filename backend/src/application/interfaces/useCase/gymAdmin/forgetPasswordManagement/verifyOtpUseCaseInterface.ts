export interface IVerifyGymAdminOtpUseCase {
  execute(data: { email: string; otp: string }): Promise<void>;
}
