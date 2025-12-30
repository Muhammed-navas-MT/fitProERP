import { Request, Response, NextFunction } from "express";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { ITokenInValidationUseCase } from "../../../application/interfaces/useCase/auth/tokenValidationUseCaseInterface";

export class GymAdminLogoutController {

  constructor( private _tokenValidation: ITokenInValidationUseCase) {
  }
  async gymAdminLogout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.header("Authorization")!;
      if (accessToken && accessToken.split(" ")[1]) {
        await this._tokenValidation.validate(accessToken.split(" ")[1]);
      }
      res.clearCookie("refreshToken");
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Gym admin logout successfully"
      );
    } catch (error) {
      next(error);
    }
  }
}
