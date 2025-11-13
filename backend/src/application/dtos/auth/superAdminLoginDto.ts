import { Roles } from "../../../domain/enums/roles";


export interface ISuperAdminLoginRequestDTO {
    email:string;
    password:string;
}

export interface ISuperAdminLoginResponseDTO {
    name:string;
    id:string;
    email:string;
    role:Roles;
}