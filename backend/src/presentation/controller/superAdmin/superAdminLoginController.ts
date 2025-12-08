import { SuperAdminLoginUseCase } from "../../../application/interfaces/useCase/superAdmin/superAdminLoginUseCase";
import { NextFunction,Request,Response } from "express";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { LoginRequestDTO } from "../../../application/dtos/auth/loginDto";
import { IJwtService } from "../../../application/interfaces/service/jwtServiceInterface";
import { setCookie } from "../../shared/utils/setCookie";

export class SuperAdminController {
    constructor (
        private _superAdminLoginUseCase:SuperAdminLoginUseCase,
        private _jwtService:IJwtService
    ){}

     async superAdminLogin(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {email,password}:LoginRequestDTO = req.body;
            const superAdmin = await this._superAdminLoginUseCase.superAdminLogin({email,password});

            const accessToken = this._jwtService.createAccessToken({id:superAdmin.id,role:superAdmin.role})
            const refreshToken = this._jwtService.createRefreshTken({id:superAdmin.id,role:superAdmin.role})
            
            setCookie(res,"refreshToken",refreshToken,{
                maxAge:604800,
                httpOnly:true,
                secure:true
            })
            ResponseHelper.success(
                200,
                res,
                "superAdmin login successful",
               {data:superAdmin,accessToken}
            );
        } catch (error) {
            next(error);
        }
    }
}