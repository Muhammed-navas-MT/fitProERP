import { SuperAdminLoginUseCase } from "../../../application/interfaces/useCase/superAdmin/superAdminLoginUseCase";
import { NextFunction,Request,Response } from "express";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { LoginRequestDTO } from "../../../application/dtos/auth/loginDto";
import { IJwtService } from "../../../application/interfaces/service/jwtServiceInterface";
import { setCookie } from "../../shared/utils/setCookie";
import { ITokenInValidationUseCase } from "../../../application/interfaces/useCase/auth/tokenValidationUseCaseInterface";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";

export class SuperAdminController {
    constructor (
        private _superAdminLoginUseCase:SuperAdminLoginUseCase,
        private _jwtService:IJwtService,
        private _tokenValidation:ITokenInValidationUseCase
    ){}

     async superAdminLogin(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {email,password}:LoginRequestDTO = req.body;
            const superAdmin = await this._superAdminLoginUseCase.superAdminLogin({email,password});

            const accessToken = this._jwtService.createAccessToken({id:superAdmin.id,role:superAdmin.role,subdomain:""})
            const refreshToken = this._jwtService.createRefreshTken({id:superAdmin.id,role:superAdmin.role,subdomain:""})
            
            setCookie(res,"refreshToken",refreshToken,{
                maxAge:7 * 24 * 60 * 60 * 1000,
                httpOnly:true,
                secure:true
            })
            ResponseHelper.success(
                200,
                res,
                "superAdmin login successfully",
               {data:superAdmin,accessToken}
            );
        } catch (error) {
            next(error);
        }
    };

    async superAdminLogout(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const accessToken = req.header("Authorization")!;
            if(accessToken && accessToken.split(" ")[1]){
                await this._tokenValidation.validate(accessToken.split(" ")[1]);
            };
            res.clearCookie("refreshToken");
            ResponseHelper.success(
                HTTP_STATUS_CODE.OK,
                res,
                "superAdmin logout successfully"
            )
        } catch (error) {
            next(error);
        }
    }
}