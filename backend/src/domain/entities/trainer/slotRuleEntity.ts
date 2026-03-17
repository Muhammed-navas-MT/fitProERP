export interface TimeSlot {
  startTime: string; // "07:00"
  endTime: string;
}

export interface SlotRuleEntity {
  _id?: string;
  trainerId: string;
  rrule: string;
  slots: TimeSlot[];
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  createdAt?: Date;
}
