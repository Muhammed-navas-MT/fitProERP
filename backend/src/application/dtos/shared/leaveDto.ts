import { LeaveStatus } from "../../../domain/enums/leaveStatus";

export interface CreateLeaveRequestDto {
  trainerId: string;
  startDate: Date;
  endDate: Date;
  reason: string;
}

export interface FindLeaveResponseDto {
  id: string;
  startDate: Date;
  endDate: Date;
  status: LeaveStatus;
  reason: string;
  rejectionReason?: string;
  appliedDate: Date;
}

export interface ListLeavesRequestDto {
  search: string;
  limit: number;
  page: number;
  status?: string;
}

export interface ListLeavesResponseDto {
  search: string;
  limit: number;
  page: number;
  status?: string;
  total: number;
  totalPages: number;
  leaves: {
    id: string;
    startDate: Date;
    endDate: Date;
    status: LeaveStatus;
    reason: string;
    appliedDate: Date;
  }[];
}

export interface UpdateLeaveRequestDto {
  trainerId: string;
  startDate: Date;
  endDate: Date;
  reason: string;
}
