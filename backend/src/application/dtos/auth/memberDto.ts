import { Status } from "../../../domain/enums/status";
import { Roles } from "../../../domain/enums/roles";
import { PaymentStatus } from "../../../domain/enums/paymentStatus";
import { BloodGroups } from "../../../domain/enums/bloocGroup";

export interface IAddMemberDTO {
  trainerId: string;
  branchId:string;
  name: string;
  email: string;
  phone: string;
  address: string;
  emergencyNumber: string;
  healthDetails: {
    gender: string;
    dateOfBirth: string;
    weight: number;
    height: number;
    targetWeight: number;
    medicalConditions?: string;
    allergies?: string;
    fitnessGoal: string;
  };
}

export interface IUpdateMemberDTO {
  name?: string;
  email?: string;
  phone?: string;
  profileImg?: string;
  address?: string;
  emergencyNumber?: string;
  healthDetails?: {
    gender?: string;
    dateOfBirth?: Date;
    weight?: {
      value?: number;
      unit?: string;
    };
    height?: {
      value?: number;
      unit?: string;
    };
    targetWeight?: {
      value?: number;
      unit?: string;
    };
    bloodGroup?: string;
    medicalConditions?: string;
    allergies?: string;
    fitnessGoal?: string;
  };
  status?: Status;
};

export interface UpdateMemberDTO {
  trainerId?: string;
  branchId?:string
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  profileImg?: string;
  emergencyNumber?: string;
  status?:Status;
  healthDetails?: {
    gender?: string;
    dateOfBirth?: string;
    weight?: number;
    height?: number;
    targetWeight?: number;
    medicalConditions?: string;
    allergies?: string;
    fitnessGoal?: string;
  };
}

