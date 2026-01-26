import { Request, Response, NextFunction } from "express";
import { RefreshTokenUseCase } from "../../../application/useCases/auth/refreshTokenUseCase";
import { JwtService } from "../../../infrastructure/services/jwtService";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { IRefreshTokenUseCase } from "../../../application/interfaces/useCase/auth/refreshTokenUseCaseInterface";

export class RefreshTokenController {
    constructor(
        private _refreshTokenUseCase:IRefreshTokenUseCase
    ){}
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;
      console.log("Refresh Token:", req.cookies.refreshToken);
      const accessToken = await this._refreshTokenUseCase.refresh(refreshToken);
      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        "Token created successfully",
        accessToken
      )
    } catch (error) {
      next(error);
    }
  }
}
