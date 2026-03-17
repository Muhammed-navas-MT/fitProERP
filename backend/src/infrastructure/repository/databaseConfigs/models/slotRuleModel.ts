import { model } from "mongoose";
import { SlotRuleSchema } from "../schemas/slotRuleSchema";

interface TimeSlot {
  startTime: string; // "07:00"
  endTime: string; // "08:00"
}

export interface ISlotRuleModel extends Document {
  _id: string;
  trainerId: string;
  rrule: string;
  slots: TimeSlot[];
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  createdAt: Date;
}

export const slotRuleModel = model<ISlotRuleModel>("SlotRule", SlotRuleSchema);
