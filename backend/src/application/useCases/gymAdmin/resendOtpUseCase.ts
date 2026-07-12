import { EmailPayloadType } from "../../../domain/type/emailPayload";
import { GymAdminAuthError } from "../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { GymAdminAuthSuccess } from "../../../presentation/shared/constants/successMessage/gymAdminAuthSuccess";
import { BadRequestException } from "../../constants/exceptions";
import { ICacheService } from "../../interfaces/service/cacheServiceInterface";
import { IEmailService } from "../../interfaces/service/IEmail/emailServiceInterface";
import { IEmailTemplateGenerator } from "../../interfaces/service/IEmail/emailTemplateGenerator";
import { IOtpService } from "../../interfaces/service/otpServiceInterface";
import { IResendOtpUseCase } from "../../interfaces/useCase/gymAdmin/resendOtpUseCaseInterface";

export class ResendOtpUseCase implements IResendOtpUseCase {
  constructor(
    private _cacheService: ICacheService,
    private _otpService: IOtpService,
    private _emailTemplateGenerator: IEmailTemplateGenerator,
    private _emailService: IEmailService,
  ) {}
  async execute(signupId: string): Promise<void> {
    const cachedRegistration = await this._cacheService.getData(signupId);

    if (!cachedRegistration) {
      throw new BadRequestException(
        GymAdminAuthError.EMAIL_DATA_MISSING_IN_CACHE,
      );
    }
    const ttl = await this._cacheService.getTTL(signupId);

    if (ttl <= 0) {
      throw new BadRequestException(
        GymAdminAuthError.EMAIL_DATA_MISSING_IN_CACHE,
      );
    }

    const otp = this._otpService.generateOtp();
    const now = Date.now();

    const registrationData = JSON.parse(cachedRegistration);

    const updatedRegistrationData = {
      ...registrationData,
      otp,
      otpExpiresAt: now + 5 * 60 * 1000,
    };

    const htmlContent = this._emailTemplateGenerator.generateHtml({ otp: otp });

    const emailPayload: EmailPayloadType = {
      recieverMailId: registrationData.email,
      subject: GymAdminAuthSuccess.REGISTRATION_SEND_OTP,
      content: htmlContent,
    };

    await this._cacheService.setData(
      signupId,
      JSON.stringify(updatedRegistrationData),
      ttl,
    );

    await this._emailService.sendEmail(emailPayload);
  }
}
