import { SessionStatus } from "../../../../domain/enums/sessionStatus";

export interface PopulateSessionItem {
  _id: string;
  trainerId: {
    name: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  status: SessionStatus;
}
