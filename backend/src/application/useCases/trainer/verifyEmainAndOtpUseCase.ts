import { EmailPayloadType } from "../../../domain/type/emailPayload";
import { TrainerError, TrainerSuccess } from "../../../presentation/shared/constants/errorMessage/trainerMessage";
import { AlreadyExistException, InvalidDataException, OtpExpiredException } from "../../constants/exceptions";
import { IVerifyOtpRequestDTO } from "../../dtos/auth/verifyOtpDto";
import { ITrainerRepository } from "../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { ICacheService } from "../../interfaces/service/cacheServiceInterface";
import { IEmailService } from "../../interfaces/service/IEmail/emailServiceInterface";
import { IEmailTemplateGenerator } from "../../interfaces/service/IEmail/emailTemplateGenerator";
import { IOtpService } from "../../interfaces/service/otpServiceInterface";
import { IVerifyEmailAndOtpUseCase } from "../../interfaces/useCase/trainer/verifyOtpAndEmailUseCaseInterface";


export class VerifyemailAndOtpUseCase implements IVerifyEmailAndOtpUseCase {
    private _otpService:IOtpService;
    private _otpTemplateGenerator:IEmailTemplateGenerator;
    private _emailService:IEmailService;
    private _trainerResository:ITrainerRepository;
    private _cacheStorage:ICacheService;
    
    constructor(
        otpService:IOtpService,
        otpTemplateGenerator:IEmailTemplateGenerator,
        emailService:IEmailService,
        trainerRepository:ITrainerRepository,
        cacheStorage:ICacheService,
    ){
        this._otpService = otpService;
        this._otpTemplateGenerator = otpTemplateGenerator;
        this._emailService = emailService;
        this._trainerResository = trainerRepository;
        this._cacheStorage = cacheStorage;
    }


    async signUpSendOtp(data: IVerifyOtpRequestDTO): Promise<void> {
        const existingGymAdmin = await this._trainerResository.findByEmail(data.email);
        if(existingGymAdmin){
            throw new AlreadyExistException(TrainerError.EMAIL_ALREADY_EXISTS);
        };
        const otp = this._otpService.generateOtp();
       const htmlContent = this._otpTemplateGenerator.generateHtml({otp:otp});
       const emailPayload:EmailPayloadType = {
        recieverMailId:data.email,
        subject:TrainerSuccess.REGISTRATION_SEND_OTP,
        content:htmlContent
       };
       this._cacheStorage.setData(data.email,otp,60*3);
       await this._emailService.sendEmail(emailPayload);
    };

    async verify(data: IVerifyOtpRequestDTO): Promise<void> {
        const cacheOtp = await this._cacheStorage.getData(data.email);
        if(!cacheOtp){
            throw new OtpExpiredException(TrainerError.EMAIL_DATA_MISSING_IN_CACHE);
        };

        if(cacheOtp != data.otp){
            throw new InvalidDataException(TrainerError.INVALID_OTP)
        }
    }
}