export interface ICancelSessionUseCase {
  execute(sessionId: string, memberId: string): Promise<void>;
}
