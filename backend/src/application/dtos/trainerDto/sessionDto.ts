import { SessionStatus } from "../../../domain/enums/sessionStatus";

export interface ListSessionItem {
  id: string;
  memberDetail: {
    name: string;
    profileImg?: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  status: SessionStatus;
}

export interface ListSessionResponseDto {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
  sessions: ListSessionItem[];
}

export interface ListSessionRequestDto {
  trainerId: string;
  limit: number;
  page: number;
}
