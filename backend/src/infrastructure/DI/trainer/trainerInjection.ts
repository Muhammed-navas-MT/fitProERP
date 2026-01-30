import { EmailService } from "../../services/IEmail/emailService";
import { TrainerRepository } from "../../repository/trainer/trainerRepo";
import { trainerModel } from "../../repository/databaseConfigs/models/trainerModel";
import { HashPassword } from "../../services/hashService";
import { MemberRepository } from "../../repository/member/memberRepo";
import { memberModel } from "../../repository/databaseConfigs/models/memberModel";
import { PasswordGenerator } from "../../services/passwordGenerater";
import { SendPasswordEmailContentGenerator } from "../../services/IEmail/sendPasswordContentGenerator";
import { GymAdminRepository } from "../../repository/gymAdmin/gymAdminRepo";
import { gymAdminModel } from "../../repository/databaseConfigs/models/gymAdminModel";
import { TrainerLoginController } from "../../../presentation/controller/trainer/trainerLoginController";
import { TrainerLoginUseCase } from "../../../application/useCases/trainer/trainerLoginUseCase";
import { JwtService } from "../../services/jwtService";
import { ListActiveTrainers } from "../../../application/useCases/trainer/listAllActiveTrainersUseCase";
import { CheckTrainerAccessMiddleWare } from "../../../presentation/middlewares/checkTrainerAccessMiddleware";
import { BranchRepository } from "../../repository/gymAdmin/branchRepo";
import { branchModel } from "../../repository/databaseConfigs/models/branchModel";
import { ProfileManagementController } from "../../../presentation/controller/trainer/profileManagementController";
import { ChangePasswordUseCase } from "../../../application/useCases/trainer/profileManagement/changePasswordUseCase";
import { UpdateProfileUseCase } from "../../../application/useCases/trainer/profileManagement/updateProfileUseCase";
import { ViewProfileUseCase } from "../../../application/useCases/trainer/profileManagement/viewProfileUseCase";
import { TrainerLogoutController } from "../../../presentation/controller/trainer/trainerLogoutController";
import { TokenValidationUseCase } from "../../../application/useCases/auth/tokenValidationUseCase";
import { CacheService } from "../../services/cacheService";
import { CreateMemberUseCase } from "../../../application/useCases/trainer/memberManagement/createMemberUseCase";
import { FindMemberUseCase } from "../../../application/useCases/trainer/memberManagement/findMemberUseCase";
import { UpdateMemberUseCase } from "../../../application/useCases/trainer/memberManagement/updateMemberUseCase";
import { ListAllMembers } from "../../../application/useCases/trainer/memberManagement/listMemberUseCase";
import { BlockMemberUseCase } from "../../../application/useCases/trainer/memberManagement/blockMemberUseCase";
import { UnBlockMemberUseCase } from "../../../application/useCases/trainer/memberManagement/unblockMemberUseCase";
import { MemberController } from "../../../presentation/controller/trainer/memberMenageMentController";

const emailService = new EmailService()
const hashService = new HashPassword();
const sendPasswordEmailContentGenerator = new SendPasswordEmailContentGenerator();
const trainerRepository = new TrainerRepository(trainerModel)
const gymAdminRepository = new GymAdminRepository(gymAdminModel);
const loginUseCase = new TrainerLoginUseCase(trainerRepository,hashService,gymAdminRepository);
const jwtService = new JwtService();
const cacheService = new CacheService()
const tokenInValidation = new TokenValidationUseCase(jwtService,cacheService)
export const injectedTrainerLoginController = new TrainerLoginController(loginUseCase,jwtService);
export const injectedTrainerLogoutController = new TrainerLogoutController(tokenInValidation)

const branchRepository = new BranchRepository(branchModel)
export const injectedCheckAccessTrainerMiddleware = new CheckTrainerAccessMiddleWare(gymAdminRepository,branchRepository,trainerRepository);

//member management
const memberRepository = new MemberRepository(memberModel)
const generatePassword = new PasswordGenerator();
const createMember = new CreateMemberUseCase(memberRepository,hashService,emailService,generatePassword,sendPasswordEmailContentGenerator,gymAdminRepository,trainerRepository);
const findMember = new FindMemberUseCase(memberRepository);
const updateMember = new UpdateMemberUseCase(memberRepository);
const listAllMembers = new ListAllMembers(memberRepository,gymAdminRepository,trainerRepository);
const blockMember = new BlockMemberUseCase(memberRepository);
const unBlockMember = new UnBlockMemberUseCase(memberRepository);
const listActiveTrainers = new ListActiveTrainers(trainerRepository,gymAdminRepository);
export const injectedMemberController = new MemberController(createMember,findMember,updateMember,unBlockMember,blockMember,listAllMembers,listActiveTrainers);

//profile management
const changePassword = new ChangePasswordUseCase(trainerRepository,hashService);
const updateProfile = new UpdateProfileUseCase(trainerRepository);
const viewProfile = new ViewProfileUseCase(trainerRepository)
export const injectedProfileController = new ProfileManagementController(changePassword,updateProfile,viewProfile);