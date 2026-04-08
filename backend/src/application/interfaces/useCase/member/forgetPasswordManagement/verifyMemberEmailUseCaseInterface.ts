export interface IVerifyMemberEmailUseCase {
  execute(data: { subdomain: string; email: string }): Promise<void>;
}
