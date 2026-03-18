import { RRule, rrulestr } from "rrule";
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

  getDatesFromRRule(rruleString: string): string[] {
    const rule = rrulestr(rruleString);

    const dates = rule.all();

    return dates.map((date) => {
      return date.toISOString().split("T")[0];
    });
  }
}
