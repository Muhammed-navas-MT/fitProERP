import { AttendanceStatus } from "../../../domain/enums/attendanceStatus";
import { AttendanceUserType } from "../../../domain/enums/attendanceUserType";

export interface MarkAttendanceDTO {
  userId: string;
  userType: AttendanceUserType;
  date: Date;
}


export interface ListAttendanceRequestDto {
  userId?: string;
  trainerId?: string;
  branchId?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}

export interface AttendanceListItemResponseDTO {
  id: string;
  date: Date;
  checkInTime?: Date;
  checkOutTime?: Date;
  status: AttendanceStatus;
}

export interface AttendanceListResponseDTO {
  data: AttendanceListItemResponseDTO[];
  total: number;
}