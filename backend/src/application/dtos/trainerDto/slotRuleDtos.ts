export interface CreateSlotRuleRequestDTO {
  trainerId: string;
  slots: { startTime: string; endTime: string; amount: number }[];
  startDate: Date;
  endDate?: Date;
}

interface Slot {
  startTime: string;
  endTime: string;
  amount: number;
}

export interface FindSlotRuleResponseDto {
  _id: string;
  slots: Slot[];
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
}

export interface UpdateSlotRuleRequestDto {
  slots?: Slot[];
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}
