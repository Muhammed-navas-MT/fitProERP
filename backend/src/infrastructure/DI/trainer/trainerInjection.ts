import { VerifyemailAndOtpUseCase } from "../../../application/useCases/trainer/verifyEmainAndOtpUseCase";
import { TrainerSignUpController } from "../../../presentation/controller/trainer/trainerSignupController";
import { OtpService } from "../../services/otpService";
import { EmailService } from "../../services/IEmail/emailService";
import { CacheService } from "../../services/cacheService";
import { SignUpOtpEmailContentGenerator } from "../../services/IEmail/signUpOtpEmailContentGenerator";
import { TrainerRepository } from "../../repository/trainer/trainerRepo";
import { trainerModel } from "../../repository/databaseConfigs/models/trainerModel";
import { SingupTrainerUseCase } from "../../../application/useCases/trainer/trainerSignUpUseCase";
import { HashPassword } from "../../services/hashService";
import { AddMemberController } from "../../../presentation/controller/trainer/addMemberController";
import { AddMemberUseCase } from "../../../application/useCases/trainer/addMemberUseCase";
import { MemberRepository } from "../../repository/member/memberRepo";
import { memberModel } from "../../repository/databaseConfigs/models/memberModel";
import { PasswordGenerator } from "../../services/passwordGenerater";
import { SendPasswordEmailContentGenerator } from "../../services/IEmail/sendPasswordContentGenerator";
import { GymAdminRepository } from "../../repository/gymAdmin/gymAdminRepo";
import { gymAdminModel } from "../../repository/databaseConfigs/models/gymAdminModel";

const otpService = new OtpService()
const emailService = new EmailService()
const cacheStorage = new CacheService()
const hashService = new HashPassword();
const signUpOtpEmailContentGenerator = new SignUpOtpEmailContentGenerator()
const trainerRepository = new TrainerRepository(trainerModel)
const verifyEmainAndOtpUseCase = new VerifyemailAndOtpUseCase(otpService,signUpOtpEmailContentGenerator,emailService,trainerRepository,cacheStorage);
const singupTrainerUseCase = new SingupTrainerUseCase(trainerRepository,hashService)
export const injectedTrainerSignUpController = new TrainerSignUpController(verifyEmainAndOtpUseCase,singupTrainerUseCase);


// add member
const memberRepository = new MemberRepository(memberModel)
const generatePassword = new PasswordGenerator();
const gymAdminRepository = new GymAdminRepository(gymAdminModel)
const sendPasswordEmailContentGenerator = new SendPasswordEmailContentGenerator()
const addMemberUseCase = new AddMemberUseCase(memberRepository,hashService,emailService,generatePassword,sendPasswordEmailContentGenerator,gymAdminRepository,trainerRepository);
export const injectedAddMemberController = new AddMemberController(addMemberUseCase)