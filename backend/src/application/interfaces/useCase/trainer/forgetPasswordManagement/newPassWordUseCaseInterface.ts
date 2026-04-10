export interface ITrainerNewPasswordUseCase {
  execute(data: {
    email: string;
    password: string;
    subdomain: string;
  }): Promise<void>;
}
