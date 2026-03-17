import { SessionStatus } from "../../enums/sessionStatus";

export interface SessionEntity {
  _id?: string;
  memberId: string;
  trainerId: string;
  sessionDate: Date;
  duration: number;
  feedback?: string;
  status: SessionStatus;
  createdAt?: Date;
}
