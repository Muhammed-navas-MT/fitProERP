import { Durations } from "../../../domain/enums/duration";
import { Roles } from "../../../domain/enums/roles";
import { Status } from "../../../domain/enums/status";

export interface LoginRequestDTO {
    email:string;
    password:string;
};

export interface GymAdminLoginRequestDTO {
    email:string;
    password:string;
    subdomain:string;
};

export interface TrainerLoginResponseDTO {
    email: string;
    name: string;
    _id: string;
    role: Roles;
    status:string,
    subdomain:string,
};

export interface GymAdminLoginResponseDTO {
    email: string;
    gymName: string;
    ownerName:string;
    phone:string;
    _id: string;
    role: Roles;
    status:string;
    subdomain:string;
};


export interface MemberLoginResponseDTO {
    email: string;
    name: string;
    _id: string;
    role: Roles;
    status:string,
}