export interface IApproveGymEmailContentGenerator {
  generateHtml(data: Record<string, string>): string;
}
