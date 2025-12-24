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
import { CloudinaryService } from "../../services/cloudinaryService";
import { GymAdminLoginController } from "../../../presentation/controller/gymAdmin/gymAdminLoginController";
import { GymAdminLoginUseCase } from "../../../application/useCases/gymAdmin/gymAdminLoginUseCase";
import { SubscriptionRepository } from "../../repository/superAdmin/subscriptionRepo";
import { subscriptionModel } from "../../repository/databaseConfigs/models/subscriptionModel";
import { JwtService } from "../../services/jwtService";
import { AuthMiddleware } from "../../../presentation/middlewares/authMiddleware";
import { GymAdminLogoutController } from "../../../presentation/controller/gymAdmin/gymAdminLogoutController";
import { TokenValidationUseCase } from "../../../application/useCases/auth/tokenValidationUseCase";
import { TrainerManagementController } from "../../../presentation/controller/gymAdmin/trainerMangement/trainerMangementController";
import { listAllTrainersUseCase } from "../../../application/useCases/gymAdmin/trainerManagement/listAllTrainersUseCase";
import { TrainerRepository } from "../../repository/trainer/trainerRepo";
import { trainerModel } from "../../repository/databaseConfigs/models/trainerModel";
import { CreateTrainerUseCase } from "../../../application/useCases/gymAdmin/trainerManagement/createTrainerUseCase";
import { SendPasswordEmailContentGenerator } from "../../services/IEmail/sendPasswordContentGenerator";
import { PasswordGenerator } from "../../services/passwordGenerater";


const otpService =new OtpService()
const signUpOtpEmailContentGenerator = new SignUpOtpEmailContentGenerator()
const emailService = new EmailService()
const gymAdminRepository = new GymAdminRepository(gymAdminModel)
const subsriptionRepository = new SubscriptionRepository(subscriptionModel)
const jwtService = new JwtService()
const cacheService = new CacheService()
const hashService = new HashPassword()
const cloudinaryService = new CloudinaryService()
const signUpUseCase = new SignUpUseCase(gymAdminRepository,hashService,cloudinaryService)
const loginUseCase = new GymAdminLoginUseCase(gymAdminRepository,hashService,subsriptionRepository)
const verifyEmailAndOtpUseCase = new VerifyemailAndOtpUseCase(otpService,signUpOtpEmailContentGenerator,emailService,gymAdminRepository,cacheService)
export const injectedGymAdminSingUpController = new SignUpController(verifyEmailAndOtpUseCase,signUpUseCase)
export const injectedGymAdminLoginController = new GymAdminLoginController(loginUseCase,jwtService);

export const injectAuthMiddleware = new AuthMiddleware(jwtService,cacheService);

const tokenValidtionUseCase = new TokenValidationUseCase(jwtService,cacheService);
export const injectedGymAdminLogoutController = new GymAdminLogoutController(tokenValidtionUseCase);

// trainer management
const trainerRepository = new TrainerRepository(trainerModel);
const passwordGenerator = new PasswordGenerator()
const sendPasswordEmailContentGenerator = new SendPasswordEmailContentGenerator();
const listAllTrainers = new listAllTrainersUseCase(trainerRepository,gymAdminRepository);
const createTrainer = new CreateTrainerUseCase(trainerRepository,hashService,passwordGenerator,emailService,gymAdminRepository,sendPasswordEmailContentGenerator,)
export const injectTrainerManagementController = new TrainerManagementController(createTrainer,listAllTrainers);