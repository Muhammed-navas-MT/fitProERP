import { PaymentStatus } from "../../enums/paymentStatus";
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
    packageId?:string;
    paymentStatus?:PaymentStatus;
    subscriptionStart?:Date;
    subscriptionEnd?:Date;
    logo:string;
    status?:Status;
    branches?:string[];
    createdAt?:Date

}