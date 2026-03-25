export interface CreateSlotRuleDTO {
  startDate: Date;
  endDate?: Date;
  slots: {
    startTime: string;
    endTime: string;
    amount: number
  }[];
}

export interface UpdateSlotRuletDto {
  slots?:{
    startTime: string;
    endTime: string;
    amount: number
  }[];
  startDate?: Date;
  endDate?: Date;
  isActive?: boolean;
}

