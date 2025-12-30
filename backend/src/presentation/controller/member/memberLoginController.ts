import { Request,Response,NextFunction } from "express";
import { IMemberLoginUseCase } from "../../../application/interfaces/useCase/member/memberLoginUseCaseInterface";
import { LoginRequestDTO, MemberLoginResponseDTO } from "../../../application/dtos/auth/loginDto";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { IJwtService } from "../../../application/interfaces/service/jwtServiceInterface";
import { setCookie } from "../../shared/utils/setCookie";
import { MemberSuccess } from "../../shared/constants/errorMessage/memberMessage";

export class MemberLoginController {
    private _loginUseCase:IMemberLoginUseCase;
    private _jwtService:IJwtService
    constructor(loginUseCase:IMemberLoginUseCase,jwtService:IJwtService){
        this._loginUseCase = loginUseCase;
        this._jwtService = jwtService
    }
    async login(req:Request,res:Response,next:NextFunction):Promise<void> {
        try {
             const {email,password}:LoginRequestDTO = req.body;
             const response:MemberLoginResponseDTO = await this._loginUseCase.login({email,password});
             const accessToken = this._jwtService.createAccessToken({id:response._id,role:response.role,subdomain:""})
             const refreshToken = this._jwtService.createRefreshTken({id:response._id,role:response.role,subdomain:""});

             setCookie(res,"refreshToken",refreshToken,{
                maxAge:604800,
                httpOnly:true,
                secure:true
             })

             ResponseHelper.success(
                HTTP_STATUS_CODE.OK,
                res,
                MemberSuccess.LOGIN_SUCCESS,
                {data:response,accessToken}
             )
        } catch (error) {
            next(error)
        }
    }
}