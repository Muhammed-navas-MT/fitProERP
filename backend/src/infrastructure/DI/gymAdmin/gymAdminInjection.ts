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
import { subscriptionlistController } from "../../../presentation/controller/gymAdmin/subscriptionListController";
import { ListAllSubscription } from "../../../application/useCases/gymAdmin/listAllSubscriptionUseCase";
import { PurchaseSubscriptionController } from "../../../presentation/controller/gymAdmin/purchaseSubscriptionController";
import { PurchaseSubscriptionUseCase } from "../../../application/useCases/gymAdmin/purchaseSubscriptionUseCase";
import { SuperAdminPaymentRepository } from "../../repository/superAdmin/paymentRepo";
import { paymentModel } from "../../repository/databaseConfigs/models/superAdminPaymentModel";
import { CreateBranchUseCase } from "../../../application/useCases/gymAdmin/branch/createBranchUseCase";
import { ListBranchUseCase } from "../../../application/useCases/gymAdmin/branch/listBranchUseCase";
import { BlockBranchUseCase } from "../../../application/useCases/gymAdmin/branch/blockBranchUseCase";
import { UnBlockBranchUseCase } from "../../../application/useCases/gymAdmin/branch/unBlockBranchUseCase";
import { FindBranchUseCase } from "../../../application/useCases/gymAdmin/branch/findBranchUseCase";
import { BranchController } from "../../../presentation/controller/gymAdmin/branchController";
import { BranchRepository } from "../../repository/gymAdmin/branchRepo";
import { branchModel } from "../../repository/databaseConfigs/models/branchModel";
import { UpdateBranchUseCase } from "../../../application/useCases/gymAdmin/branch/updateBranchUseCase";
import { MemberRepository } from "../../repository/member/memberRepo";
import { memberModel } from "../../repository/databaseConfigs/models/memberModel";
import { ListActveBranchUseCase } from "../../../application/useCases/gymAdmin/branch/listAllActiveBranchesUseCase";
import { BlockTrainerUseCase } from "../../../application/useCases/gymAdmin/trainerManagement/blockTrainerUseCase";
import { UnBlockTrainerUseCase } from "../../../application/useCases/gymAdmin/trainerManagement/unBlockTrainerUseCase";
import { FindTrainerUseCase } from "../../../application/useCases/gymAdmin/trainerManagement/findTrainerUseCase";
import { UpdateTrainerUseCase } from "../../../application/useCases/gymAdmin/trainerManagement/updateTrainerUseCase";
import { MemberManagementController } from "../../../presentation/controller/gymAdmin/membermanagement/memberManagementController";
import { CreateMemberUseCase } from "../../../application/useCases/gymAdmin/memberManagement/createMemberUseCase";
import { UpdateMemberUseCase } from "../../../application/useCases/gymAdmin/memberManagement/updateMemberUseCase";
import { FindMemberUseCase } from "../../../application/useCases/gymAdmin/memberManagement/findMemberUseCase";
import { BlockMemberUseCase } from "../../../application/useCases/gymAdmin/memberManagement/blockMemberUseCase";
import { UnBlockMemberUseCase } from "../../../application/useCases/gymAdmin/memberManagement/unblockMemberUseCase";
import { ListAllMemberUseCase } from "../../../application/useCases/gymAdmin/memberManagement/listAllMemberUseCase";
import { ListAllActiveTrainersByBranch } from "../../../application/useCases/gymAdmin/trainerManagement/listAllActiveTrainersUseCase";
import { ViewGymAdminProfileUseCase } from "../../../application/useCases/gymAdmin/profileManagement/viewGymAdminProfileUseCase";
import { UpdateGymAdminProfileUseCase } from "../../../application/useCases/gymAdmin/profileManagement/updateGymAdminProfileUseCase";
import { ChangeGymAdminPasswordUseCase } from "../../../application/useCases/gymAdmin/profileManagement/changeGymAdminPasswordUseCase";
import { GymAdminProfileController } from "../../../presentation/controller/gymAdmin/profileManagementController";


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
const loginUseCase = new GymAdminLoginUseCase(gymAdminRepository,hashService)
const verifyEmailAndOtpUseCase = new VerifyemailAndOtpUseCase(otpService,signUpOtpEmailContentGenerator,emailService,gymAdminRepository,cacheService)
export const injectedGymAdminSingUpController = new SignUpController(verifyEmailAndOtpUseCase,signUpUseCase)
export const injectedGymAdminLoginController = new GymAdminLoginController(loginUseCase,jwtService);

export const injectAuthMiddleware = new AuthMiddleware(jwtService,cacheService);

const tokenValidtionUseCase = new TokenValidationUseCase(jwtService,cacheService);
export const injectedGymAdminLogoutController = new GymAdminLogoutController(tokenValidtionUseCase);

// trainer management
const memberRepository = new MemberRepository(memberModel)
const trainerRepository = new TrainerRepository(trainerModel);
const passwordGenerator = new PasswordGenerator()
const sendPasswordEmailContentGenerator = new SendPasswordEmailContentGenerator();
const listAllTrainers = new listAllTrainersUseCase(trainerRepository,gymAdminRepository);
const blockTrainer = new BlockTrainerUseCase(trainerRepository,memberRepository);
const unBlockTrainer = new UnBlockTrainerUseCase(trainerRepository);
const findTrainer = new FindTrainerUseCase(trainerRepository);
const updateTrainer = new UpdateTrainerUseCase(trainerRepository,memberRepository);
const listAllActiveTrainers = new ListAllActiveTrainersByBranch(trainerRepository)
const createTrainer = new CreateTrainerUseCase(trainerRepository,hashService,passwordGenerator,emailService,gymAdminRepository,sendPasswordEmailContentGenerator,)
export const injectTrainerManagementController = new TrainerManagementController(createTrainer,listAllTrainers,blockTrainer,unBlockTrainer,findTrainer,updateTrainer,listAllActiveTrainers);

//subscription list controller
const listAllActiveSubscription = new ListAllSubscription(subsriptionRepository)
export const injectedListSubscriptionController = new subscriptionlistController(listAllActiveSubscription);

const paymentRepository = new SuperAdminPaymentRepository(paymentModel)
const purchaseSubscriptionUseCase = new PurchaseSubscriptionUseCase(paymentRepository,subsriptionRepository,gymAdminRepository)
export const injectedPurchaseSubscriptionController = new PurchaseSubscriptionController(purchaseSubscriptionUseCase)

// branch controller
const branchRepository = new BranchRepository(branchModel);
const createBranch = new CreateBranchUseCase(branchRepository,gymAdminRepository);
const updateBranch = new UpdateBranchUseCase(branchRepository)
const listBranch = new ListBranchUseCase(branchRepository,memberRepository,trainerRepository);
const blockBranch = new BlockBranchUseCase(branchRepository);
const unBlockBranch = new UnBlockBranchUseCase(branchRepository);
const findBranch = new FindBranchUseCase(branchRepository);
const listActiveBranch = new ListActveBranchUseCase(branchRepository);
export const injectedBranchController = new BranchController(createBranch,listBranch,findBranch,unBlockBranch,blockBranch,updateBranch,listActiveBranch);

// member management controller
const createMember = new CreateMemberUseCase(
    memberRepository,
    hashService,
    emailService,
    passwordGenerator,
    sendPasswordEmailContentGenerator,
    gymAdminRepository,trainerRepository,
    branchRepository
);
const updateMember = new UpdateMemberUseCase(memberRepository);
const findMember = new FindMemberUseCase(memberRepository);
const blockMember = new BlockMemberUseCase(memberRepository);
const unBlockMember = new UnBlockMemberUseCase(memberRepository);
const listMembers = new ListAllMemberUseCase(memberRepository,gymAdminRepository);
export const injectedMemberManagementController = new MemberManagementController(createMember,listMembers,findMember,updateMember,blockMember,unBlockMember);

//profile management
const updateProfile = new UpdateGymAdminProfileUseCase(gymAdminRepository);
const viewProfile = new ViewGymAdminProfileUseCase(gymAdminRepository);
const changePassword = new ChangeGymAdminPasswordUseCase(gymAdminRepository,hashService);
export const injectedGymAdminProfileControler = new GymAdminProfileController(viewProfile,updateProfile,changePassword);
