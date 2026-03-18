export interface IRRuleService {
  createDailyRule(startDate: Date, endDate?: Date): string;
  getDatesFromRRule(rruleString: string): string[];
}
