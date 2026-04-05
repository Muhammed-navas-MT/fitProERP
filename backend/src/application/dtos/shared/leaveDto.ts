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
  leaveCount: number;
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
  isExided: boolean;
  exidedmessage?: string;
  leaves: {
    id: string;
    startDate: Date;
    endDate: Date;
    leaveCount: number;
    status: LeaveStatus;
    reason: string;
    appliedDate: Date;
  }[];
  summary: {
    allocatedLeavesThisMonth: number;
    usedLeavesThisMonth: number;
    extraLeavesTaken: number;
  };
}

export interface UpdateLeaveRequestDto {
  trainerId: string;
  startDate: Date;
  endDate: Date;
  reason: string;
}

export interface FindTrainerLeaveResponseDto {
  id: string;
  startDate: Date;
  endDate: Date;
  leaveCount: number;
  status: LeaveStatus;
  reason: string;
  rejectionReason?: string;
  appliedDate: Date;
  branchDetail: {
    branchName: string;
    city: string;
    pincode: string;
  };
  trainerDetail: {
    name: string;
    email: string;
  };
  isExided: boolean;
  Exidedmessage?: string;
}

export interface ListTrainersLeavesRequestDto {
  search: string;
  limit: number;
  page: number;
  status?: string;
  branchId?: string;
}

export interface ListTrainerLeavesResponseDto {
  search: string;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
  leaves: {
    id: string;
    startDate: Date;
    endDate: Date;
    leaveCount: number;
    status: LeaveStatus;
    reason: string;
    appliedDate: Date;
    branchDetail: {
      branchName: string;
      city: string;
      pincode: string;
    };
    trainerDetail: {
      name: string;
      email: string;
    };
  }[];
}
