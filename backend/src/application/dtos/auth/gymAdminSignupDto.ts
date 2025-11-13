import { Roles } from "../../../domain/enums/roles";

export interface ISignupRequsetDTO {
    gymName:string;
    ownerName:string;
    email:string;
    phone:string;
    password:string;
    role:Roles;
    subdomain:string;
    description:string;
    tagline:string;
    businessLicense:string;
    insuranceCertificate:string;
    subscriptionId:string;
    logo:string;
}

