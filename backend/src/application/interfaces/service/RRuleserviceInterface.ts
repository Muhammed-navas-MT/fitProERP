export interface IRRuleService {
  createDailyRule(startDate: Date, endDate?: Date): string;
}
