import { SessionStatus } from "../../../domain/enums/sessionStatus";

export interface AvailableSlotResponseDto {
  trainerId: string;
  slots: AvailableSlotDay[];
}

export interface AvailableSlotRequestDto {
  memberId: string;
  trainerId: string;
}

export interface AvailableSlotDay {
  date: string;
  slots: TimeSlot[];
}

export interface TimeSlot {
  slotId: string;
  amount: number;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface CreateMemberSessionCheckoutRequestDto {
  trainerId: string;
  slotId: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  amount: number;
  userId: string;
  subdomain: string;
}

export interface ListSessionsItem {
  _id: string;
  trainerDetail: {
    name: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  status: SessionStatus;
}

export interface ListAllSessionsResponseDto {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  countOfUpComingSession: number;
  session: ListSessionsItem[];
}

export interface ListAllSessionsRequestDto {
  page: number;
  limit: number;
  memberId: string;
}
