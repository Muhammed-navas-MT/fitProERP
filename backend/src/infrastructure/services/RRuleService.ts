import { RRule } from "rrule";
import { IRRuleService } from "../../application/interfaces/service/RRuleserviceInterface";

export class RRuleService implements IRRuleService {
  createDailyRule(startDate: Date, endDate?: Date): string {
    const rule = new RRule({
      freq: RRule.DAILY,
      interval: 1,
      dtstart: startDate,
      until: endDate,
    });

    return rule.toString();
  }
}
