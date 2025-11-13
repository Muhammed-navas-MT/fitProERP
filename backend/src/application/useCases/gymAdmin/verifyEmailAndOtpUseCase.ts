import { IVerifyEmailAndOtpUseCase } from "../../interfaces/useCase/gymAdmin/verifyEmail&Otp";
import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { AlreadyExistException } from "../../constants/exceptions";
import { OtpService } from "../../../infrastructure/services/otpService";
import { IVerifyEmailRequestDTO } from "../../dtos/auth/verifyOtpDto";
import { IOtpService } from "../../interfaces/service/otpServiceInterface";
import { IEmailTemplateGenerator } from "../../interfaces/service/IEmail/emailTemplateGenerator";
import { IEmailService } from "../../interfaces/service/IEmail/emailServiceInterface";
import { ICacheService } from "../../interfaces/service/cacheServiceInterface";

export class VerifyemailAndOtpUseCase implements IVerifyEmailAndOtpUseCase {
    private _otpService:IOtpService;
    private _otpTemplateGenerator:IEmailTemplateGenerator;
    
    constructor(
        otpService:IOtpService,
        otpTemplateGenerator:IEmailTemplateGenerator,
        emailService:IEmailService,
        gymAdminRepository:IGymAdminRepository,
        cacheStorage:ICacheService,
    ){

    }
}