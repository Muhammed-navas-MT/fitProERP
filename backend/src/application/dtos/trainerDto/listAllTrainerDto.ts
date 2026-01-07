import { Roles } from "../../../domain/enums/roles";
import { Status } from "../../../domain/enums/status";

export interface IListTrainerResponseDTO {
    total:number;
    page:number;
    limit:number;
    totalPages:number;
    search:string;
    data:Array<
        {
            id?:string,
            name?:string,
            role?:Roles,
            email?:string,
            phone?:string,
            joinDate?:string,
            specializations?:string[],
            status?:Status,
            avatar?:string,
        }>
}

export interface IListTrainerRequestDTO {
    search:string;
    page:number;
    limit:number;
    gymId:string;
};

export interface IListActiveTrainers {
    id:string,
    name:string
}

export interface TrainerDTO {
  id: string;
  gymId: string;
  branchId: string;
  name: string;
  email: string;
  phone: string;
  role: Roles;
  specialization: string[];
  experience: number;
  baseSalary: number;
  commisionRate: number;
  status: Status;
  dutyTime: {
    startTime: string;
    endTime: string;
  };
  address: string;
  createdAt: Date;
}

export interface IUpdateTrainerDTO {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  address?: string;
  role?: Roles;
  specialization?: string[];
  experience?: number;
  baseSalary?: number;
  commisionRate?: number;
  status?: Status;
  dutyTime?: {
    startTime: string;
    endTime: string;
  };
  branchId?: string;
}

export interface IChangePasswordRequestDTO {
  trainerId: string;
  oldPassword: string;
  newPassword: string;
}