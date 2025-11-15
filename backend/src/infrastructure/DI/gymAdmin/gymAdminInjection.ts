import { SignUpController } from "../../../presentation/controller/gymAdmin/gymAdminSignUpController";
import { VerifyemailAndOtpUseCase } from "../../../application/useCases/gymAdmin/verifyEmailAndOtpUseCase";
import { OtpService } from "../../services/otpService";
import { SignUpOtpEmailContentGenerator } from "../../services/IEmail/signUpOtpEmailContentGenerator";
import { EmailService } from "../../services/IEmail/emailService";
import { GymAdminRepository } from "../../repository/gymAdmin/gymAdminRepo";
import { CacheService } from "../../services/cacheService";
import { gymAdminModel } from "../../repository/databaseConfigs/models/gymAdminModel";
import { SignUpUseCase } from "../../../application/useCases/gymAdmin/gymAdminSignUpUseCase";
import { HashPassword } from "../../services/hashService";


const otpService =new OtpService()
const signUpOtpEmailContentGenerator = new SignUpOtpEmailContentGenerator()
const emailService = new EmailService()
const gymAdminRepository = new GymAdminRepository(gymAdminModel)
const cacheService = new CacheService()
const hashService = new HashPassword()
const signUpUseCase = new SignUpUseCase(gymAdminRepository,hashService)
const verifyEmailAndOtpUseCase = new VerifyemailAndOtpUseCase(otpService,signUpOtpEmailContentGenerator,emailService,gymAdminRepository,cacheService)
export const injectedGymAdminSingUpController = new SignUpController(verifyEmailAndOtpUseCase,signUpUseCase)