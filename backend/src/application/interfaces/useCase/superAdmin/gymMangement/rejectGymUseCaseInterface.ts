export interface IRejectGymUseCase {
  reject(id: string, reason: string): Promise<void>;
}