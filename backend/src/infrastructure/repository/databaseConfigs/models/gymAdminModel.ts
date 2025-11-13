import { gymAdminSchema } from "../schemas/gymAdminSchema";
import { Status } from "../../../../domain/enums/status";
import { Document,model} from "mongoose";
import { Roles } from "../../../../domain/enums/roles";

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
    insuranceDertificate:string;
    subscriptionId:string;
    paymentStatus:boolean;
    subscriptionStart:Date;
    subscriptionEnd:Date;
    logo:string;
    status:Status;
    branches:string[];
    createdAt:Date
}

export const gymAdminModel = model<IGymAdminModel>("GymAdmin",gymAdminSchema)