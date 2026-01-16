export interface IAttendanceViewRule {
  resolveBranchId(userId: string): Promise<string[]>;
}
