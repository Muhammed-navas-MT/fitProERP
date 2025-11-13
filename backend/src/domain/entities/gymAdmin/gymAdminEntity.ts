import { Roles } from "../../enums/roles";
import { Status } from "../../enums/status";

export interface GymAdminEntity {
    _id?:string;
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
    paymentStatus?:boolean;
    subscriptionStart?:Date;
    subscriptionEnd?:Date;
    logo:string;
    status?:Status;
    branches?:string[];
    createdAt?:Date

}