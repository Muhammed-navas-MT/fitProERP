export interface CreateSlotRuleDTO {
  startDate: Date;
  endDate?: Date;
  slots: {
    startTime: string;
    endTime: string;
  }[];
}
