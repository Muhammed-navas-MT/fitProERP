export interface IShowGymDetailUseCase {
  execute(trainerId: string): Promise<{ logo: string; gymName: string }>;
}
