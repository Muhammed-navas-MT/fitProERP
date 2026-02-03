import { PaymentStatus } from "../../../domain/enums/paymentStatus";
import { Roles } from "../../../domain/enums/roles";
import { Status } from "../../../domain/enums/status";

export interface IListMemberResponseDTO {
    total:number;
    page:number;
    limit:number;
    totalPages:number;
    search:string;
    assignMemberCount?:number;
    activeMembersCount?:number;
    data:Array<
        {
            id?:string,
            name?:string,
            email?:string,
            phone?:string,
            profileImg?:string,
            status?:Status,
            avatar?:string,
            branchName?:string
            createdAt?:Date
        }>
}

export interface IListMemberRequestDTO {
    search:string;
    page:number;
    limit:number;
    trainerId:string;
}

export interface IListMemberInGymRequestDTO {
    search:string;
    page:number;
    limit:number;
    gymId:string;
}

export interface MemberDTO {
  id: string;
  gymId: string;
  branchId?: string;
  trainerId: string;
  name: string;
  email: string;
  phone: string;
  profileImg?: string;
  address: string;
  role: Roles;
  emergencyNumber: string;

  healthDetails: {
    gender: string;
    dateOfBirth: Date;
    weight: {
      value: number;
      unit?: string;
    };
    height: {
      value: number;
      unit?: string;
    };
    targetWeight: {
      value: number;
      unit?: string;
    };
    medicalConditions?: string;
    allergies?: string;
    fitnessGoal: string;
  };
  package?: {
    planId: string;
    startDate?: Date;
    endDate?: Date;
    price: number;
    status: PaymentStatus;
  };
  status: Status;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImg?: string;
  avatar?: string;
  status: Status;
  createdAt?: Date;
}