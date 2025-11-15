import { Roles } from "../../../domain/enums/roles";

export interface ISignupRequsetDTO {
    gymName:string;
    ownerName:string;
    email:string;
    phone:string;
    password:string;
    role:Roles;
    description:string;
    subdomain:string;
    tagline:string;
    businessLicense:string;
    insuranceCertificate:string;
    logo:string;
    confirmPassword:string;
}

