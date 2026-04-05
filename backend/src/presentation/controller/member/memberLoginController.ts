import { Request, Response, NextFunction } from "express";
import { IMemberLoginUseCase } from "../../../application/interfaces/useCase/member/memberLoginUseCaseInterface";
import {
  LoginRequestDTO,
  MemberLoginResponseDTO,
} from "../../../application/dtos/auth/loginDto";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { IJwtService } from "../../../application/interfaces/service/jwtServiceInterface";
import { setCookie } from "../../shared/utils/setCookie";
import { MemberSuccess } from "../../shared/constants/errorMessage/memberMessage";
import { configEnv } from "../../../config/envConfig";
import { IGoogleLoginUseCase } from "../../../application/interfaces/useCase/member/googleLoginUseCaseInterface";

export class MemberLoginController {
  private _loginUseCase: IMemberLoginUseCase;
  private _jwtService: IJwtService;
  // private _googleLogingUseCase: IGoogleLoginUseCase;
  constructor(
    loginUseCase: IMemberLoginUseCase,
    jwtService: IJwtService,
    // googleLogingUseCase: IGoogleLoginUseCase,
  ) {
    this._loginUseCase = loginUseCase;
    this._jwtService = jwtService;
    // this._googleLogingUseCase = googleLogingUseCase;
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password }: LoginRequestDTO = req.body;
      const response: MemberLoginResponseDTO = await this._loginUseCase.login({
        email,
        password,
      });
      const accessToken = this._jwtService.createAccessToken({
        id: response._id,
        role: response.role,
        subdomain: response.subdomain,
      });
      const refreshToken = this._jwtService.createRefreshTken({
        id: response._id,
        role: response.role,
        subdomain: response.subdomain,
      });

      setCookie(res, "refreshToken", refreshToken, {
        maxAge: Number(configEnv.MAX_AGE),
        httpOnly: true,
        secure: true,
      });
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        MemberSuccess.LOGIN_SUCCESS,
        { data: response, accessToken },
      );
    } catch (error) {
      next(error);
    }
  }
  // async googleLogin(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ): Promise<void> {
  //   try {
  //     const token = req.body;
  //     const response = await this._googleLogingUseCase.execute(token);

  //     const accessToken = this._jwtService.createAccessToken({
  //       id: response._id,
  //       role: response.role,
  //       subdomain: response.subdomain,
  //     });
  //     const refreshToken = this._jwtService.createRefreshTken({
  //       id: response._id,
  //       role: response.role,
  //       subdomain: response.subdomain,
  //     });

  //     setCookie(res, "refreshToken", refreshToken, {
  //       maxAge: Number(configEnv.MAX_AGE),
  //       httpOnly: true,
  //       secure: true,
  //     });
  //     ResponseHelper.success(
  //       HTTP_STATUS_CODE.OK,
  //       res,
  //       MemberSuccess.LOGIN_SUCCESS,
  //       { data: response, accessToken },
  //     );
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
