import { Roles } from "../../../domain/enums/roles";
import { Status } from "../../../domain/enums/status";

export interface IListTrainerResponseDTO {
    total:number;
    page:number;
    limit:number;
    totalPages:number;
    search:string;
    data:Array<
        {
            id?:string,
            name?:string,
            role?:Roles,
            email?:string,
            phone?:string,
            joinDate?:string,
            branchName?:string,
            specializations?:string[],
            status?:Status,
            avatar?:string,
        }>
}

export interface IListTrainerRequestDTO {
    search:string;
    page:number;
    limit:number;
    gymId:string;
}