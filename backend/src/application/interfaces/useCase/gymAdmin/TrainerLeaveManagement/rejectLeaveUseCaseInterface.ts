export interface IRejectTrainerLeaveUseCase {
  execute(leaveId: string, reason: string): Promise<void>;
}
