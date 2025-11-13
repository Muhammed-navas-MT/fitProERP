import { Response } from "express";


 interface ApiResponse<T> {
    success:boolean;
    message:string;
    data?:T;
 };


 export class ResponseHelper {
    static success<T>(status:number,res:Response,message:string,data?:T):
    Response<ApiResponse<T>> {
        return res.status(status).json({
            success:true,
            message,
            data
        });

    }

        static error(status:number,res:Response,message:string):
        Response<ApiResponse<null>> {
        return res.status(status).json({
            success:false,
            message,
            data:null
        });
    }
 }