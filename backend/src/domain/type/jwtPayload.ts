import { Roles } from "../enums/roles";

export interface JWTPayloadType {
    id:string;
    role:string;
    subdomain:string;
}