import { Roles } from "../../enums/roles";
import { Status } from "../../enums/status";

export interface TrainerEntity {
    _id?: string;
    gymId: string;
    branchId?: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    address: string;
    role:Roles;
    specialization: string[];
    experience: number;
    baseSalary: number;
    commisionRate: number;
    status: Status;
    dutyTime: {
        startTime: string;
        endTime: string;
    };
    createdAt?: Date;
}