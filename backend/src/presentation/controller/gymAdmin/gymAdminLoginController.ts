import { Request,Response,NextFunction } from "express";
import { IGymAdminLoginUseCase } from "../../../application/interfaces/useCase/gymAdmin/gymAdminLoginUseCaseInterface";
import { LoginRequestDTO } from "../../../application/dtos/auth/loginDto";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { GymAdminAuthSuccess } from "../../shared/constants/successMessage/gymAdminAuthSuccess";
import { IJwtService } from "../../../application/interfaces/service/jwtServiceInterface";
import { setCookie } from "../../shared/utils/setCookie";

export class GymAdminLoginController {
    private _loginUseCase:IGymAdminLoginUseCase;
    private _jwtService:IJwtService;

    constructor(loginUseCase:IGymAdminLoginUseCase,jwtService:IJwtService){
        this._loginUseCase = loginUseCase;
        this._jwtService = jwtService;
    }
    async login(req:Request,res:Response,next:NextFunction):Promise<void> {
        try {
             const {email,password}:LoginRequestDTO = req.body;
             const subdomain = req.tenant || "";
             const response = await this._loginUseCase.login({email,password,subdomain});

             const accessToken = this._jwtService.createAccessToken({id:response._id,role:response.role,subdomain:response.subdomain});
             const refreshToken = this._jwtService.createRefreshTken({id:response._id,role:response.role,subdomain:response.subdomain});

             setCookie(res,"refreshToken",refreshToken,{
                maxAge:604800,
                httpOnly:true,
                secure:true
             })
             ResponseHelper.success(
                HTTP_STATUS_CODE.OK,
                res,
                GymAdminAuthSuccess.LOGIN_SUCCESS,
                {data:response,accessToken}
             )
        } catch (error) {
            next(error)
        }
    }
}