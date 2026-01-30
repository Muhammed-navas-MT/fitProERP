import { gymAdminSchema } from "../schemas/gymAdminSchema";
import { Status } from "../../../../domain/enums/status";
import { Document,model} from "mongoose";
import { Roles } from "../../../../domain/enums/roles";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";

export interface IGymAdminModel extends Document {
    _id:string;
    gymName:string;
    ownerName:string;
    email:string;
    phone:string;
    password:string;
    role:Roles,
    subdomain:string;
    description:string;
    tagline:string;
    businessLicense:string;
    insuranceCertificate:string;
    packageId?:string;
    paymentStatus?:PaymentStatus;
    subscriptionStart?:Date;
    subscriptionEnd?:Date;
    limits?:{
        maxBranches: number;
        maxTrainers: number;
        maxMembers: number;
    }
    logo:string;
    status?:Status;
    branches?:string[];
    createdAt?:Date
}

export const gymAdminModel = model<IGymAdminModel>("GymAdmin",gymAdminSchema)