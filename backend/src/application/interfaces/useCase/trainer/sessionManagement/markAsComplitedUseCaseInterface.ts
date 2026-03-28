export interface IMarkAsCompletedUseCase {
  execute(sessionId: string): Promise<void>;
}
