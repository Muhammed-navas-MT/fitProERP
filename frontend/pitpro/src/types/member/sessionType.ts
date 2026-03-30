export enum SessionStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface ListAllSessionData {
  countOfUpComingSession: number;
  limit: number;
  page: number;
  session: ListSessionItem[];
  total: number;
  totalPages: number;
}

export interface ListAllSessionResponse {
  success: boolean;
  message: string;
  data: ListAllSessionData;
}

export interface ListSessionItem {
  _id: string;
  trainerDetail:{
    name:string;
    _id:string;
  };
  date: string;
  startTime: string;
  endTime: string;
  status: SessionStatus;
}