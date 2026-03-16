export interface ICreateWorkoutPlanUseCase {
  execute(userId: string): Promise<void>;
}
