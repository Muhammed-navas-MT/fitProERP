export interface IGymAdminNewPasswordUseCase {
  execute(data: { email: string; password: string }): Promise<void>;
}
