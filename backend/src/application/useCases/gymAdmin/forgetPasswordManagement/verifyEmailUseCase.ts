import { EmailPayloadType } from "../../../../domain/type/emailPayload";
import { GymAdminAuthError } from "../../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { NOtFoundException } from "../../../constants/exceptions";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ICacheService } from "../../../interfaces/service/cacheServiceInterface";
import { IEmailService } from "../../../interfaces/service/IEmail/emailServiceInterface";
import { ISendForgotPasswordOtpEmailContentGenerator } from "../../../interfaces/service/IEmail/sendForgotPasswordOtpEmailContentGeneratorInterface";
import { IOtpService } from "../../../interfaces/service/otpServiceInterface";
import { IVerifyTrainerEmailUseCase } from "../../../interfaces/useCase/trainer/forgetPasswordManagement/verifyEmailUseCaseInterface";

export class VerifyGymAdminEmailUseCase implements IVerifyTrainerEmailUseCase {
  constructor(
    private _otpService: IOtpService,
    private _cacheService: ICacheService,
    private _emailService: IEmailService,
    private _sendForgetPasswordOptEmailContentGenerator: ISendForgotPasswordOtpEmailContentGenerator,
    private _gymAdminRepository: IGymAdminRepository,
  ) {}
  async execute(data: { email: string }): Promise<void> {
    const gym = await this._gymAdminRepository.findByEmail(data.email);

    if (!gym) {
      throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
    }

    const otp = this._otpService.generateOtp();
    console.log(otp);
    const htmlContent =
      this._sendForgetPasswordOptEmailContentGenerator.generateHtml({
        otp: otp,
      });
    const emailPayload: EmailPayloadType = {
      recieverMailId: data.email,
      subject: "Your OTP for Password Reset",
      content: htmlContent,
    };

    await this._emailService.sendEmail(emailPayload);

    this._cacheService.setData(data.email, otp, 60 * 10);
  }
}
