import { Roles } from "../../../domain/enums/roles";
import { Status } from "../../../domain/enums/status";

export interface ITrainerCreateRequestDTO {
  gymId: string;
  branchId?: string;
  name: string;
  email: string;
  phone: string;
  role: Roles;
  address: string;
  specialization: string[];
  experience: number;
  baseSalary: number;
  commisionRate: number;
  allocatedLeaveCount: number;
  sessionCount: number;
  status: Status;
  dutyTime: {
    startTime: string;
    endTime: string;
  };
}

export interface ITrainerUpdateDTO {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  specialization?: string[];
  experience?: number;
  baseSalary?: number;
  commisionRate?: number;
  allocatedLeaveCount?: number;
  sessionCount?: number;
  status?: Status;
  dutyTime?: {
    startTime?: string;
    endTime?: string;
  };
}

export interface IListActiveTrainersResponseDto {
  id: string;
  name: string;
  specialization: string[];
}

export interface AssignedTrainerResponseDto {
  id: string;
  name: string;
}
