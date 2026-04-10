import { NextFunction, Request, Response } from "express";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { changePasswordSchema } from "../../shared/validations/passwordZodSchema";
import { BadRequestException } from "../../../application/constants/exceptions";
import { IVerifyGymAmdinEmailUseCase } from "../../../application/interfaces/useCase/gymAdmin/forgetPasswordManagement/verifyEmailUseCaseInterface";
import { IVerifyGymAdminOtpUseCase } from "../../../application/interfaces/useCase/gymAdmin/forgetPasswordManagement/verifyOtpUseCaseInterface";
import { IGymAdminNewPasswordUseCase } from "../../../application/interfaces/useCase/gymAdmin/forgetPasswordManagement/newPassWordUseCaseInterface";

export class GymAdminForgetPasswordController {
  constructor(
    private _verifyEmailUseCase: IVerifyGymAmdinEmailUseCase,
    private _verifyOtpUseCase: IVerifyGymAdminOtpUseCase,
    private _newPasswordUseCase: IGymAdminNewPasswordUseCase,
  ) {}
  async handleVerifyEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email } = req.body;
      await this._verifyEmailUseCase.execute({ email });
      ResponseHelper.success(HTTP_STATUS_CODE.OK, res, "Otp sent successfully");
    } catch (error) {
      next(error);
    }
  }
  async handleVerifyOtp(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { otp, email } = req.body;
      await this._verifyOtpUseCase.execute({ email, otp });
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Otp verified successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  async handleNewPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      const validationResult = changePasswordSchema.safeParse({
        newPassword: password,
      });
      if (!validationResult.success) {
        throw new BadRequestException(validationResult.error.issues[0].message);
      }

      await this._newPasswordUseCase.execute({ email, password });

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Password Updated successfully",
      );
    } catch (error) {
      next(error);
    }
  }
}
