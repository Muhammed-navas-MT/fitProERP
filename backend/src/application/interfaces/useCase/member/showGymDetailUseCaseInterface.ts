export interface IShowGymDetailUseCase {
  execute(memberId: string): Promise<{ logo: string; gymName: string }>;
}
