import { IVerifyEmailAndOtpUseCase } from "../../interfaces/useCase/gymAdmin/verifyEmail&Otp";
import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { AlreadyExistException, InvalidOtpException, OtpExpiredException } from "../../constants/exceptions";
import { IVerifyEmailRequestDTO, IVerifyOtpRequestDTO } from "../../dtos/auth/verifyOtpDto";
import { IOtpService } from "../../interfaces/service/otpServiceInterface";
import { IEmailTemplateGenerator } from "../../interfaces/service/IEmail/emailTemplateGenerator";
import { IEmailService } from "../../interfaces/service/IEmail/emailServiceInterface";
import { ICacheService } from "../../interfaces/service/cacheServiceInterface";
import { GymAdminAuthError } from "../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { EmailPayloadType } from "../../../domain/type/emailPayload";
import { GymAdminAuthSuccess } from "../../../presentation/shared/constants/successMessage/gymAdminAuthSuccess";

export class VerifyemailAndOtpUseCase implements IVerifyEmailAndOtpUseCase {
    private _otpService:IOtpService;
    private _otpTemplateGenerator:IEmailTemplateGenerator;
    private _emailService:IEmailService;
    private _gymAdminResository:IGymAdminRepository;
    private _cacheStorage:ICacheService;
    
    constructor(
        otpService:IOtpService,
        otpTemplateGenerator:IEmailTemplateGenerator,
        emailService:IEmailService,
        gymAdminRepository:IGymAdminRepository,
        cacheStorage:ICacheService,
    ){
        this._otpService = otpService;
        this._otpTemplateGenerator = otpTemplateGenerator;
        this._emailService = emailService;
        this._gymAdminResository = gymAdminRepository;
        this._cacheStorage = cacheStorage;
    }


    async signUpSendOtp(data: IVerifyEmailRequestDTO): Promise<void> {
        const existingGymAdmin = await this._gymAdminResository.findByEmail(data.email);
        if(existingGymAdmin){
            throw new AlreadyExistException(GymAdminAuthError.EMAIL_ALREADY_EXISTS);
        };
        const otp = this._otpService.generateOtp();
       const htmlContent = this._otpTemplateGenerator.generateHtml({otp:otp});
       const emailPayload:EmailPayloadType = {
        recieverMailId:data.email,
        subject:GymAdminAuthSuccess.REGISTRATION_SEND_OTP,
        content:htmlContent
       };

       await this._emailService.sendEmail(emailPayload);

       this._cacheStorage.setData(data.email,otp,60*10)
    };

    async verify(data: IVerifyOtpRequestDTO): Promise<void> {
        const cacheOtp = await this._cacheStorage.getData(data.email);
        if(!cacheOtp){
            throw new OtpExpiredException(GymAdminAuthError.EMAIL_DATA_MISSING_IN_CACHE);
        };

        if(cacheOtp != data.otp){
            throw new InvalidOtpException(GymAdminAuthError.INVALID_OTP)
        }
    }
}