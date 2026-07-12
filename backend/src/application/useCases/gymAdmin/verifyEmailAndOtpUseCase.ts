import { IVerifyEmailAndOtpUseCase } from "../../interfaces/useCase/gymAdmin/verifyEmail&Otp";
import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import {
  AlreadyExistException,
  InvalidOtpException,
  OtpExpiredException,
} from "../../constants/exceptions";
import {
  IVerifyEmailRequestDTO,
  IVerifyOtpRequestDTO,
} from "../../dtos/auth/verifyOtpDto";
import { IOtpService } from "../../interfaces/service/otpServiceInterface";
import { IEmailTemplateGenerator } from "../../interfaces/service/IEmail/emailTemplateGenerator";
import { IEmailService } from "../../interfaces/service/IEmail/emailServiceInterface";
import { ICacheService } from "../../interfaces/service/cacheServiceInterface";
import { GymAdminAuthError } from "../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { EmailPayloadType } from "../../../domain/type/emailPayload";
import { GymAdminAuthSuccess } from "../../../presentation/shared/constants/successMessage/gymAdminAuthSuccess";
import { IIdGenerator } from "../../interfaces/service/cryptoIdGeneratorInterface";
import { IHashService } from "../../interfaces/service/hashServiceInterface";

export class VerifyemailAndOtpUseCase implements IVerifyEmailAndOtpUseCase {
  private _otpService: IOtpService;
  private _otpTemplateGenerator: IEmailTemplateGenerator;
  private _emailService: IEmailService;
  private _gymAdminResository: IGymAdminRepository;
  private _cacheStorage: ICacheService;
  private _idGenerator: IIdGenerator;
  private _hashService: IHashService;

  constructor(
    otpService: IOtpService,
    otpTemplateGenerator: IEmailTemplateGenerator,
    emailService: IEmailService,
    gymAdminRepository: IGymAdminRepository,
    cacheStorage: ICacheService,
    idGenerator: IIdGenerator,
    hashService: IHashService,
  ) {
    this._otpService = otpService;
    this._otpTemplateGenerator = otpTemplateGenerator;
    this._emailService = emailService;
    this._gymAdminResository = gymAdminRepository;
    this._cacheStorage = cacheStorage;
    this._idGenerator = idGenerator;
    this._hashService = hashService;
  }

  async signUpSendOtp(data: IVerifyEmailRequestDTO): Promise<string> {
    const existingGymAdmin = await this._gymAdminResository.findByEmail(
      data.email,
    );

    if (existingGymAdmin) {
      throw new AlreadyExistException(GymAdminAuthError.EMAIL_ALREADY_EXISTS);
    }

    if (data.signupId) {
      const cachedRegistration = await this._cacheStorage.getData(
        data.signupId,
      );

      if (cachedRegistration) {
        const registrationData = JSON.parse(cachedRegistration);

        if (registrationData.email !== data.email) {
          const reservedSignupId = await this._cacheStorage.getData(data.email);

          if (reservedSignupId) {
            throw new AlreadyExistException(
              GymAdminAuthError.EMAIL_ALREADY_ACTIVE_REGISTRATION,
            );
          }
        }
      } else {
        const reservedSignupId = await this._cacheStorage.getData(data.email);

        if (reservedSignupId) {
          throw new AlreadyExistException(
            GymAdminAuthError.EMAIL_ALREADY_ACTIVE_REGISTRATION,
          );
        }
      }
    } else {
      const reservedSignupId = await this._cacheStorage.getData(data.email);

      if (reservedSignupId) {
        throw new AlreadyExistException(
          GymAdminAuthError.EMAIL_ALREADY_ACTIVE_REGISTRATION,
        );
      }
    }
    const otp = this._otpService.generateOtp();
    console.log(otp);

    const htmlContent = this._otpTemplateGenerator.generateHtml({ otp: otp });

    const emailPayload: EmailPayloadType = {
      recieverMailId: data.email,
      subject: GymAdminAuthSuccess.REGISTRATION_SEND_OTP,
      content: htmlContent,
    };
    const signupId = data.signupId ?? this._idGenerator.generate();

    await this._emailService.sendEmail(emailPayload);

    const hashPassword = await this._hashService.hash(data.password);

    const now = Date.now();

    const userData = {
      ...data,
      password: hashPassword,
      otp,
      otpExpiresAt: now + 5 * 60 * 1000,
      isVerified: false,
      currentStep: 1,
    };

    await this._cacheStorage.setData(signupId, JSON.stringify(userData), 1800);
    await this._cacheStorage.setData(data.email, signupId, 1800);
    return signupId;
  }

  async verify(data: IVerifyOtpRequestDTO): Promise<void> {
    const cachedRegistration = await this._cacheStorage.getData(data.signupId);
    if (!cachedRegistration) {
      throw new OtpExpiredException(
        GymAdminAuthError.EMAIL_DATA_MISSING_IN_CACHE,
      );
    }

    const ttl = await this._cacheStorage.getTTL(data.signupId);

    if (ttl <= 0) {
      throw new OtpExpiredException(
        GymAdminAuthError.EMAIL_DATA_MISSING_IN_CACHE,
      );
    }
    const registrationData = JSON.parse(cachedRegistration);

    if (!registrationData.otp) {
      throw new InvalidOtpException(GymAdminAuthError.OTP_ALREADY_VERIFIED);
    }

    if (Date.now() > registrationData.otpExpiresAt) {
      throw new OtpExpiredException(GymAdminAuthError.OTP_EXPIRED);
    }

    if (registrationData.otp !== data.otp) {
      throw new InvalidOtpException(GymAdminAuthError.INVALID_OTP);
    }

    registrationData.otp = null;
    registrationData.otpExpiresAt = null;
    registrationData.isVerified = true;

    await this._cacheStorage.setData(
      data.signupId,
      JSON.stringify(registrationData),
      ttl,
    );
  }
}
