import { Request, Response, NextFunction } from "express";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { ITokenInValidationUseCase } from "../../../application/interfaces/useCase/auth/tokenValidationUseCaseInterface";
import { TrainerSuccess } from "../../shared/constants/errorMessage/trainerMessage";

export class TrainerLogoutController {

  constructor( private _tokenValidation: ITokenInValidationUseCase) {
  }
  async trainerLogout(
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
        TrainerSuccess.LOGOUT_SUCCESS
      );
    } catch (error) {
      next(error);
    }
  }
}
