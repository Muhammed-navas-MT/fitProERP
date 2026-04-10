import { NextFunction, Request, Response } from "express";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { changePasswordSchema } from "../../shared/validations/passwordZodSchema";
import { BadRequestException } from "../../../application/constants/exceptions";
import { IVerifyTrainerEmailUseCase } from "../../../application/interfaces/useCase/trainer/forgetPasswordManagement/verifyEmailUseCaseInterface";
import { IVerifyTrainerOtpUseCase } from "../../../application/interfaces/useCase/trainer/forgetPasswordManagement/verifyOtpUseCaseInterface";
import { ITrainerNewPasswordUseCase } from "../../../application/interfaces/useCase/trainer/forgetPasswordManagement/newPassWordUseCaseInterface";

export class TrainerForgetPasswordController {
  constructor(
    private _verifyEmailUseCase: IVerifyTrainerEmailUseCase,
    private _verifyOtpUseCase: IVerifyTrainerOtpUseCase,
    private _newPasswordUseCase: ITrainerNewPasswordUseCase,
  ) {}
  async handleVerifyEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const subdomain = req.tenant || "";
      const { email } = req.body;
      await this._verifyEmailUseCase.execute({ email, subdomain });
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
      const subdomain = req.tenant || "";
      const { email, password } = req.body;

      const validationResult = changePasswordSchema.safeParse({
        newPassword: password,
      });
      if (!validationResult.success) {
        throw new BadRequestException(validationResult.error.issues[0].message);
      }

      await this._newPasswordUseCase.execute({ email, password, subdomain });

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
