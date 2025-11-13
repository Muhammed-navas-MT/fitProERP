import { Roles } from "../../enums/roles";


export interface SuperAdminEntity {
    _id?:string;
    name:string;
    email:string;
    phone?:string;
    password?:string;
    role:Roles;
    createdAt?:Date;
}