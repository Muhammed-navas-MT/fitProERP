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
import { SubscriptionlistController } from "../../../presentation/controller/gymAdmin/subscriptionListController";
import { ListAllSubscription } from "../../../application/useCases/gymAdmin/listAllSubscriptionUseCase";
import { PurchaseSubscriptionController } from "../../../presentation/controller/gymAdmin/purchaseSubscriptionController";
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
import { ViewPackageUseCase } from "../../../application/useCases/gymAdmin/packageManagement/viewPackageUseCase";
import { CreatePackageUseCase } from "../../../application/useCases/gymAdmin/packageManagement/createPackageUseCase";
import { UpdatePackageUseCase } from "../../../application/useCases/gymAdmin/packageManagement/updatePackageUseCase";
import { BlockPackageUseCase } from "../../../application/useCases/gymAdmin/packageManagement/blockPackageUseCase";
import { UnBlockPackageUseCase } from "../../../application/useCases/gymAdmin/packageManagement/unBlockPackageUseCase";
import { ListPackageUseCase } from "../../../application/useCases/gymAdmin/packageManagement/listPackageUseCase";
import { PackageController } from "../../../presentation/controller/gymAdmin/packageManagementController";
import { PackageRepository } from "../../repository/gymAdmin/packageRepo";
import { PackageModel } from "../../repository/databaseConfigs/models/packageModel";
import { CreateCheckoutSessionUseCase } from "../../../application/useCases/gymAdmin/createCheckoutSessionUseCase";
import { CheckGymAdminSubscriptionMiddleware } from "../../../presentation/middlewares/checkGymAdminSubscriptionMiddleware";
import { ReApplyController } from "../../../presentation/controller/gymAdmin/reApplyController";
import { ReApplyUseCase } from "../../../application/useCases/gymAdmin/reApplyUseCase";
import { FindRevenueDetailUseCase } from "../../../application/useCases/gymAdmin/revenueManagement/findRevenueUseCase";
import { GymAdminRevenueRepository } from "../../repository/gymAdmin/revenueRepo";
import { gymAdminRevenueModel } from "../../repository/databaseConfigs/models/revenueModel";
import { ListRevenueUseCase } from "../../../application/useCases/gymAdmin/revenueManagement/listRevenueUseCase";
import { GymAdminRevenueController } from "../../../presentation/controller/gymAdmin/revenueManagementController";
import { GymAdminExpenseRepository } from "../../repository/gymAdmin/expenseRepo";
import { gymAdminExpenseModel } from "../../repository/databaseConfigs/models/expenseModel";
import { CreateExpenseUseCase } from "../../../application/useCases/gymAdmin/expenseManagement/createExpenseUseCase";
import { FindExpenseUseCase } from "../../../application/useCases/gymAdmin/expenseManagement/findExpenseUseCase";
import { FindExpenseDetailUseCase } from "../../../application/useCases/gymAdmin/expenseManagement/findExpenseDetailUseCase";
import { ListAllExpenseUseCase } from "../../../application/useCases/gymAdmin/expenseManagement/listAllExpenseUseCase";
import { UpdateExpenseUseCase } from "../../../application/useCases/gymAdmin/expenseManagement/updateExpenseUseCase";
import { GymAdminExpenseController } from "../../../presentation/controller/gymAdmin/expenseManagementController";
import { ProfitRepository } from "../../repository/gymAdmin/profitRepo";
import { gymAdminProfitModel } from "../../repository/databaseConfigs/models/gymAdminProfitModel";
import { GetProfitAnalyticsUseCase } from "../../../application/useCases/gymAdmin/profitManagement/getProfitAnalyticsUseCase";
import { ProfitController } from "../../../presentation/controller/gymAdmin/profitManagementController";
import { LeaveRepository } from "../../repository/shared/leaveRepo";
import { trainerLeaveModel } from "../../repository/databaseConfigs/models/trainerLeaveModel";
import { RejectTrainerLeaveUseCase } from "../../../application/useCases/gymAdmin/trainerLeaveManagement/rejectTrainerLeaveUseCase";
import { ApproveTrainerLeaveUseCase } from "../../../application/useCases/gymAdmin/trainerLeaveManagement/approveTrainerLeaveUseCase";
import { FindTrainerLeaveUseCase } from "../../../application/useCases/gymAdmin/trainerLeaveManagement/findLeaveDetailUseCase";
import { ListAllTrainerLeaveUseCase } from "../../../application/useCases/gymAdmin/trainerLeaveManagement/listAllTRainerLeaveUseCase";
import { TrainerLeaveController } from "../../../presentation/controller/gymAdmin/trainerLeaveManagementController";
import { CreateNotificationUseCase } from "../../../application/useCases/shared/notificationManagement/createNotificationUseCase";
import { NotificationRepository } from "../../repository/shared/notificationRepo";
import { notificationModel } from "../../repository/databaseConfigs/models/notificationModel";
import { NotificationService } from "../../services/notificationService";
import { SocketService } from "../../services/socketService";

const otpService = new OtpService();
const signUpOtpEmailContentGenerator = new SignUpOtpEmailContentGenerator();
const emailService = new EmailService();
const gymAdminRepository = new GymAdminRepository(gymAdminModel);
const packageRepository = new PackageRepository(PackageModel);
const subsriptionRepository = new SubscriptionRepository(subscriptionModel);
const revenueRepository = new GymAdminRevenueRepository(gymAdminRevenueModel);
const expenseRepository = new GymAdminExpenseRepository(gymAdminExpenseModel);
const profitRepository = new ProfitRepository(gymAdminProfitModel);
const leaveRepository = new LeaveRepository(trainerLeaveModel);
const jwtService = new JwtService();
const cacheService = new CacheService();
const hashService = new HashPassword();
const cloudinaryService = new CloudinaryService();
const socketService = new SocketService();
const noticationRepository = new NotificationRepository(notificationModel);
const notificationUseCase = new CreateNotificationUseCase(
  noticationRepository,
  socketService,
);
const notificationService = new NotificationService(notificationUseCase);
const signUpUseCase = new SignUpUseCase(
  gymAdminRepository,
  hashService,
  cloudinaryService,
);
const loginUseCase = new GymAdminLoginUseCase(gymAdminRepository, hashService);
const verifyEmailAndOtpUseCase = new VerifyemailAndOtpUseCase(
  otpService,
  signUpOtpEmailContentGenerator,
  emailService,
  gymAdminRepository,
  cacheService,
);
export const injectedGymAdminSingUpController = new SignUpController(
  verifyEmailAndOtpUseCase,
  signUpUseCase,
);
export const injectedGymAdminLoginController = new GymAdminLoginController(
  loginUseCase,
  jwtService,
);

export const injectAuthMiddleware = new AuthMiddleware(
  jwtService,
  cacheService,
);

const tokenValidtionUseCase = new TokenValidationUseCase(
  jwtService,
  cacheService,
);
export const injectedGymAdminLogoutController = new GymAdminLogoutController(
  tokenValidtionUseCase,
);

// trainer management
const memberRepository = new MemberRepository(memberModel);
const trainerRepository = new TrainerRepository(trainerModel);
const passwordGenerator = new PasswordGenerator();
const sendPasswordEmailContentGenerator =
  new SendPasswordEmailContentGenerator();
const listAllTrainers = new listAllTrainersUseCase(
  trainerRepository,
  gymAdminRepository,
);
const blockTrainer = new BlockTrainerUseCase(
  trainerRepository,
  memberRepository,
);
const unBlockTrainer = new UnBlockTrainerUseCase(trainerRepository);
const findTrainer = new FindTrainerUseCase(trainerRepository);
const updateTrainer = new UpdateTrainerUseCase(
  trainerRepository,
  memberRepository,
);
const listAllActiveTrainers = new ListAllActiveTrainersByBranch(
  trainerRepository,
);
const createTrainer = new CreateTrainerUseCase(
  trainerRepository,
  hashService,
  passwordGenerator,
  emailService,
  gymAdminRepository,
  sendPasswordEmailContentGenerator,
);
export const injectTrainerManagementController =
  new TrainerManagementController(
    createTrainer,
    listAllTrainers,
    blockTrainer,
    unBlockTrainer,
    findTrainer,
    updateTrainer,
    listAllActiveTrainers,
  );

//subscription list controller
const listAllActiveSubscription = new ListAllSubscription(
  subsriptionRepository,
  gymAdminRepository,
);
export const injectedListSubscriptionController =
  new SubscriptionlistController(listAllActiveSubscription);

const createCheckoutSessionUseCase = new CreateCheckoutSessionUseCase(
  subsriptionRepository,
  gymAdminRepository,
);
export const injectedPurchaseSubscriptionController =
  new PurchaseSubscriptionController(createCheckoutSessionUseCase);

// branch controller
const branchRepository = new BranchRepository(branchModel);
const createBranch = new CreateBranchUseCase(
  branchRepository,
  gymAdminRepository,
);
const updateBranch = new UpdateBranchUseCase(branchRepository);
const listBranch = new ListBranchUseCase(
  branchRepository,
  memberRepository,
  trainerRepository,
);
const blockBranch = new BlockBranchUseCase(branchRepository);
const unBlockBranch = new UnBlockBranchUseCase(branchRepository);
const findBranch = new FindBranchUseCase(branchRepository);
const listActiveBranch = new ListActveBranchUseCase(branchRepository);
export const injectedBranchController = new BranchController(
  createBranch,
  listBranch,
  findBranch,
  unBlockBranch,
  blockBranch,
  updateBranch,
  listActiveBranch,
);

// member management controller
const createMember = new CreateMemberUseCase(
  memberRepository,
  hashService,
  emailService,
  passwordGenerator,
  sendPasswordEmailContentGenerator,
  gymAdminRepository,
  trainerRepository,
  branchRepository,
  notificationService,
);
const updateMember = new UpdateMemberUseCase(
  memberRepository,
  notificationService,
);
const findMember = new FindMemberUseCase(memberRepository);
const blockMember = new BlockMemberUseCase(memberRepository);
const unBlockMember = new UnBlockMemberUseCase(memberRepository);
const listMembers = new ListAllMemberUseCase(
  memberRepository,
  gymAdminRepository,
);
export const injectedMemberManagementController =
  new MemberManagementController(
    createMember,
    listMembers,
    findMember,
    updateMember,
    blockMember,
    unBlockMember,
  );

//profile management
const updateProfile = new UpdateGymAdminProfileUseCase(gymAdminRepository);
const viewProfile = new ViewGymAdminProfileUseCase(gymAdminRepository);
const changePassword = new ChangeGymAdminPasswordUseCase(
  gymAdminRepository,
  hashService,
);
export const injectedGymAdminProfileControler = new GymAdminProfileController(
  viewProfile,
  updateProfile,
  changePassword,
);

//package management
const viewPackage = new ViewPackageUseCase(packageRepository);
const createPackage = new CreatePackageUseCase(packageRepository);
const updatePackage = new UpdatePackageUseCase(packageRepository);
const blockPackage = new BlockPackageUseCase(packageRepository);
const unBlockPackage = new UnBlockPackageUseCase(packageRepository);
const listPackages = new ListPackageUseCase(packageRepository);
export const injectedPackageController = new PackageController(
  blockPackage,
  createPackage,
  viewPackage,
  listPackages,
  unBlockPackage,
  updatePackage,
);

export const injectedCheckGymAdminSubscriptionMiddleware =
  new CheckGymAdminSubscriptionMiddleware(gymAdminRepository);
const reApplyUseCase = new ReApplyUseCase(
  gymAdminRepository,
  cloudinaryService,
);
export const injectedReApplyController = new ReApplyController(reApplyUseCase);

const findRevenue = new FindRevenueDetailUseCase(revenueRepository);
const listAllRevenues = new ListRevenueUseCase(revenueRepository);
export const injectedRevenueController = new GymAdminRevenueController(
  listAllRevenues,
  findRevenue,
);

//expense management
const createExpense = new CreateExpenseUseCase(expenseRepository);
const findExpense = new FindExpenseUseCase(expenseRepository);
const findExpenseDetail = new FindExpenseDetailUseCase(expenseRepository);
const listAllExpense = new ListAllExpenseUseCase(expenseRepository);
const updateExpense = new UpdateExpenseUseCase(expenseRepository);
export const injectedExpenseController = new GymAdminExpenseController(
  createExpense,
  findExpense,
  findExpenseDetail,
  listAllExpense,
  updateExpense,
);

//profit management
const getProfitAnalytics = new GetProfitAnalyticsUseCase(
  profitRepository,
  revenueRepository,
  expenseRepository,
);
export const injectedProfitCotroller = new ProfitController(getProfitAnalytics);

//Trainer leave management
const rejectLeave = new RejectTrainerLeaveUseCase(
  leaveRepository,
  notificationService,
);
const approveLeave = new ApproveTrainerLeaveUseCase(
  leaveRepository,
  notificationService,
);
const findTrainerLeave = new FindTrainerLeaveUseCase(
  leaveRepository,
  trainerRepository,
);
const listAllTrainerLeave = new ListAllTrainerLeaveUseCase(leaveRepository);

export const injectedTrainerLeaveController = new TrainerLeaveController(
  approveLeave,
  findTrainerLeave,
  listAllTrainerLeave,
  rejectLeave,
);
