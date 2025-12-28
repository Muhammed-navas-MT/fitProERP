export interface IRejectGymEmailContentGenerator  {
  generateHtml(data: Record<string, string>): string;
}
