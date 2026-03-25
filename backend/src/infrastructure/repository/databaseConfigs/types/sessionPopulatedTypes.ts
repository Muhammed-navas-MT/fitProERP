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

export interface PopulateTrainerSessionItem {
  _id: string;
  memberId: {
    name: string;
    profileImg?: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  status: SessionStatus;
}
