export interface ICreateDietPlanUseCase {
  execute(userId: string): Promise<void>;
}
