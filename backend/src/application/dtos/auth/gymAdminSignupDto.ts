import { Roles } from "../../../domain/enums/roles";

export interface ISignupRequsetDTO {
    gymName: string;
    ownerName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    role: Roles;
    description: string;
    subdomain: string;
    tagline: string;
    businessLicense: Express.Multer.File | string;
    insuranceCertificate: Express.Multer.File | string;
    logo: Express.Multer.File | string;
}

export interface IReApplyDTO {
    email:string;
    businessLicense: Express.Multer.File | string;
    insuranceCertificate: Express.Multer.File | string;
}