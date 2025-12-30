import { Durations } from "../../../domain/enums/duration";
import { Roles } from "../../../domain/enums/roles";
import { Status } from "../../../domain/enums/status";

export interface IListMemberResponseDTO {
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
            profileImg?:string,
            status?:Status,
            avatar?:string,
        }>
}

export interface IListMemberRequestDTO {
    search:string;
    page:number;
    limit:number;
    trainerId:string;
}