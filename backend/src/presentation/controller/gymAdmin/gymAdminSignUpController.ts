import { NextFunction, Request, Response } from "express";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { IVerifyEmailAndOtpUseCase } from "../../../application/interfaces/useCase/gymAdmin/verifyEmail&Otp";
import {
  IGymInfoRequestDTO,
  IVerifyEmailRequestDTO,
  IVerifyOtpRequestDTO,
} from "../../../application/dtos/auth/verifyOtpDto";
import {
  BadRequestException,
  InvalidDataException,
} from "../../../application/constants/exceptions";
import { GymAdminAuthSuccess } from "../../shared/constants/successMessage/gymAdminAuthSuccess";
import { IDocumentRequsetDTO } from "../../../application/dtos/auth/gymAdminSignupDto";
import {
  gymInfoSchema,
  ownerInfoWithConfirmPasswordSchema,
} from "../../shared/validations/gymAdminSignUpZodSchema";
import { GymAdminAuthError } from "../../shared/constants/errorMessage/gymAdminAuthError";
import { ISingupUseCase } from "../../../application/interfaces/useCase/gymAdmin/gymAdminSignUpUseCaseInterface";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { IResendOtpUseCase } from "../../../application/interfaces/useCase/gymAdmin/resendOtpUseCaseInterface";
import { IResumeRegistrationUseCase } from "../../../application/interfaces/useCase/gymAdmin/resumeRegistrationUseCaseInterface";
import { IGymInformationUseCase } from "../../../application/interfaces/useCase/gymAdmin/gymInformantionUseCaseInterface";

export class SignUpController {
  constructor(
    private _VerifyEmailAndOtpUseCase: IVerifyEmailAndOtpUseCase,
    private _singupUseCase: ISingupUseCase,
    private _resendOtpUseCase: IResendOtpUseCase,
    private _resumeRegistrationUseCase: IResumeRegistrationUseCase,
    private _gymInformationUseCase: IGymInformationUseCase,
  ) {}

  async verifyEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data: IVerifyEmailRequestDTO = req.body;
      const { signupId: existingSignupId } = req.body || "";

      const validationResult =
        ownerInfoWithConfirmPasswordSchema.safeParse(data);
      if (validationResult.error) {
        throw new InvalidDataException(
          validationResult.error.issues[0].message,
        );
      }

      const signupId = await this._VerifyEmailAndOtpUseCase.signUpSendOtp({
        ...validationResult.data,
        signupId: existingSignupId,
      });
      ResponseHelper.success(200, res, GymAdminAuthSuccess.OTP_SUCCESSFULL, {
        signupId,
      });
    } catch (error) {
      next(error);
    }
  }

  async resendOtp(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { signupId } = req.body;

      if (!signupId) {
        throw new BadRequestException(GymAdminAuthError.SINUP_ID_REQUEIRED);
      }

      await this._resendOtpUseCase.execute(signupId);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        GymAdminAuthSuccess.RESEND_OTP_SEND,
      );
    } catch (error) {
      next(error);
    }
  }

  async verifyOtp(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const otp: IVerifyOtpRequestDTO = req.body;

      await this._VerifyEmailAndOtpUseCase.verify(otp);

      ResponseHelper.success(
        200,
        res,
        GymAdminAuthSuccess.OTP_VERIFIED_SUCCESSFULL,
      );
    } catch (error) {
      next(error);
    }
  }

  async gymInformation(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const gymInfo: IGymInfoRequestDTO = req.body;

      gymInfo.subdomain = gymInfo.gymName
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[^a-z]/g, "");

      const validationResult = gymInfoSchema.safeParse(gymInfo);

      if (!validationResult.success) {
        throw new BadRequestException(validationResult.error.issues[0].message);
      }

      await this._gymInformationUseCase.execute({
        ...validationResult.data,
        logo: req.file,
        signupId: gymInfo.signupId,
      });

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        GymAdminAuthSuccess.GYM_INFORMATION,
      );
    } catch (error) {
      next(error);
    }
  }

  async resumeRegistration(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { signupId } = req.params;

      const data = await this._resumeRegistrationUseCase.execute(signupId);

      console.log(data);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        GymAdminAuthSuccess.REGISTRATION_PROGRESS_RESTORED,
        data,
      );
    } catch (error) {
      next(error);
    }
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const gymAdminData: IDocumentRequsetDTO = req.body;

      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      await this._singupUseCase.signUp({
        ...gymAdminData,
        businessLicense: files?.businessLicense?.[0],
        insuranceCertificate: files?.insuranceCertificate?.[0],
      });

      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        GymAdminAuthSuccess.REGISTRATION_SUCCESS,
      );
    } catch (error) {
      next(error);
    }
  }
}
