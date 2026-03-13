export interface IApproveTrainerLeaveUseCase {
  execute(leaveId: string): Promise<void>;
}
