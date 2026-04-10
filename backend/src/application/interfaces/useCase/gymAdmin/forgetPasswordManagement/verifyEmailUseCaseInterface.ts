export interface IVerifyGymAmdinEmailUseCase {
  execute(data: { email: string }): Promise<void>;
}
