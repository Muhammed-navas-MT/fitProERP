import { Durations } from "../../../domain/enums/duration";
import { Roles } from "../../../domain/enums/roles";
import { Status } from "../../../domain/enums/status";

export interface LoginRequestDTO {
    email:string;
    password:string;
};

export interface TrainerLoginResponseDTO {
    email: string;
    name: string;
    _id: string;
    role: Roles;
    status:string,
};

export interface GymAdminLoginResponseDTO {
    email: string;
    gymName: string;
    _id: string;
    role: Roles;
    status:string,
    subscriptions?: {
        _id: string;
        planName: string;
        price: number;
        duration: Durations;
        features: string[];
    }[]
};


export interface MemberLoginResponseDTO {
    email: string;
    firstName: string;
    _id: string;
    role: Roles;
    status:string,
}