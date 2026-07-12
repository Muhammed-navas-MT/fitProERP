export interface IResendOtpUseCase {
  execute(signupId: string): Promise<void>;
}
