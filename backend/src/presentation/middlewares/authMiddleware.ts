import { Request,Response,NextFunction } from "express";
import { ICacheService } from "../../application/interfaces/service/cacheServiceInterface";
import { IJwtService } from "../../application/interfaces/service/jwtServiceInterface";
import { Error } from "../shared/constants/errorMessage/Error";
import { HTTP_STATUS_CODE } from "../shared/constants/statusCode/statusCode";

export class AuthMiddleware {
    constructor(
        private _jwtService:IJwtService,
        private _cacheService:ICacheService
    ){};

    verify = async (req:Request,res:Response,next:NextFunction)=>{
        const header = req.header("Authorization");

        if(!header?.startsWith("Bearer")) {
            res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({success:false,message:Error.TOKEN_INVALID})
        };
        const token = header?.split(" ")[1];
        const decoded = this._jwtService.verifyAccessToken(token as string);
        if(!decoded){
            res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({success:false,message:Error.TOKEN_INVALID});
        };
        const blackList = await this._cacheService.getData(`blackList:${token}`);
        if(blackList){
            res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({success:false,message:Error.TOKEN_INVALID});
        }
        res.locals.data = {role:decoded?.role,id:decoded?.id,subdomain:decoded?.subdomain};
        next();
    }
}