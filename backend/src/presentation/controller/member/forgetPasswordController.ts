import { NextFunction, Request, Response } from "express";
import { INewMemberPasswordUseCase } from "../../../application/interfaces/useCase/member/forgetPasswordManagement/newPassWordUseCaseInterface";
import { IVerifyMemberEmailUseCase } from "../../../application/interfaces/useCase/member/forgetPasswordManagement/verifyMemberEmailUseCaseInterface";
import { IVerifyMemberOtpUseCase } from "../../../application/interfaces/useCase/member/forgetPasswordManagement/verifyMemberOtpUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { changePasswordSchema } from "../../shared/validations/passwordZodSchema";
import { BadRequestException } from "../../../application/constants/exceptions";

export class MemberForgetPasswordController {
  constructor(
    private _verifyMemberEmailUseCase: IVerifyMemberEmailUseCase,
    private _verifyMemberOtpUseCase: IVerifyMemberOtpUseCase,
    private _newPasswordUseCase: INewMemberPasswordUseCase,
  ) {}
  async handleVerifyEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const subdomain = req.tenant || "";
      const { email } = req.body;
      await this._verifyMemberEmailUseCase.execute({ email, subdomain });
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
      await this._verifyMemberOtpUseCase.execute({ email, otp });
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
      console.log(req.body, subdomain);
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
