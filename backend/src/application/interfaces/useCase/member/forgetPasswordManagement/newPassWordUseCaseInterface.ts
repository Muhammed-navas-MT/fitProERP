export interface INewMemberPasswordUseCase {
  execute(data: {
    email: string;
    password: string;
    subdomain: string;
  }): Promise<void>;
}
