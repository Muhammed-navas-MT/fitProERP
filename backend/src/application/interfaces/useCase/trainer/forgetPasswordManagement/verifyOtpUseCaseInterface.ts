export interface IVerifyTrainerOtpUseCase {
  execute(data: { email: string; otp: string }): Promise<void>;
}
