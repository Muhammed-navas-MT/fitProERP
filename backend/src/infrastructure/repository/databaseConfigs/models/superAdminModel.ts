import { Document,model,Model } from "mongoose";
import { Roles } from "../../../../domain/enums/roles";
import { superAdminSchema } from "../schemas/superAdminSchema";

export interface ISuperAdminModel extends Document {
    _id:string;
    name:string;
    email:string;
    phone:string;
    password:string;
    role:Roles;
};

export const superAdminModel = model<ISuperAdminModel>("SuperAdmin",superAdminSchema);