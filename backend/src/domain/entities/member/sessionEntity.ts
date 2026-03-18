import { SessionStatus } from "../../enums/sessionStatus";

export interface SessionEntity {
  _id?: string;
  memberId: string;
  trainerId: string;
  slotId: string;
  date: string;
  startTime: string;
  endTime: string;
  amount: number;
  feedback?: string;
  status: SessionStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
