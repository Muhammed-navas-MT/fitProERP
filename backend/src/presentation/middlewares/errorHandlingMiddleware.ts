import { Request,Response,NextFunction } from "express";
import { HTTP_STATUS_CODE } from "../shared/constants/statusCode/statusCode";
import { ResponseHelper } from "../shared/utils/responseHelper";
import { AlreadyExistException, ApplicationException, InvalidDataException, NOtFoundException as NotFoundException, UpdateFailedException, TokenExpiredException } from "../../application/constants/exceptions";


export const errorHandleMiddleware = (err:Error,req:Request,res:Response,next:NextFunction)=>{
    try {
        let statusCode = HTTP_STATUS_CODE.BAD_REQUEST;

        if(err instanceof ApplicationException){
            if(err instanceof NotFoundException){
                statusCode = HTTP_STATUS_CODE.NOT_FOUND
            }else if(err instanceof AlreadyExistException){
                statusCode = HTTP_STATUS_CODE.CONFLICT
            }else if(err instanceof UpdateFailedException||
                err instanceof InvalidDataException ||
                err instanceof InvalidDataException
            ){
                statusCode = HTTP_STATUS_CODE.BAD_REQUEST
            }else if(err instanceof TokenExpiredException){
                statusCode = HTTP_STATUS_CODE.UNAUTHORIZED;
            }
        };
        ResponseHelper.error(
            err instanceof Error ? statusCode : HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
            res,
            err instanceof Error ? err.message : "Internal Server Error"
        )
    } catch (error) {
        console.log(error)
    }
}