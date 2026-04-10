export interface IVerifyTrainerEmailUseCase {
  execute(data: { subdomain: string; email: string }): Promise<void>;
}
