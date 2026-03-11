 enum LeaveStatus {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  APPROVED = "APPROVED",
}

export interface CreateLeaveItem {
  startDate: Date;
  endDate: Date;
  reason: string;
};

export interface LeaveItem {
  id: string;
  startDate: Date;
  endDate: Date;
  status: LeaveStatus;
  reason: string;
  rejectionReason?: string;
  appliedDate: Date;
}

export interface ListLeaveItem {
  id: string;
  trainerId: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: string;
}

export interface ListLeaveResponse {
  data: {
    leaves: ListLeaveItem[];
    total: number;
    totalPages: number;
  };
}