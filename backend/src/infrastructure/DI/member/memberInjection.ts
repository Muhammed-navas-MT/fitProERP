import { TokenValidationUseCase } from "../../../application/useCases/auth/tokenValidationUseCase";
import { CreateDietPlanUseCase } from "../../../application/useCases/member/dietPlanManagement/createDietPlanUseCase";
import { ListDietPlanUseCase } from "../../../application/useCases/member/dietPlanManagement/listDietPlanUseCase";
import { ListActiveTrainersUseCase } from "../../../application/useCases/member/listActiveTrainersUseCase";
import { MemberLoginUseCase } from "../../../application/useCases/member/memberLoginUseCase";
import { CreateMemberCheckoutSessionUseCase } from "../../../application/useCases/member/packageAndPurchaseManagement/createMemberCheckoutUseCase";
import { ListActivePackagesUseCase } from "../../../application/useCases/member/packageAndPurchaseManagement/listActivepackagesUseCase";
import { ListAllPaymentsUseCase } from "../../../application/useCases/member/packageAndPurchaseManagement/listAllPaymentsUseCase";
import { ChangePasswordUseCase } from "../../../application/useCases/member/profileManagement/changePasswordUseCase";
import { DeleteProfilePictureUseCase } from "../../../application/useCases/member/profileManagement/deleteProfilePictureUseCase";
import { UpdateProfileUseCase } from "../../../application/useCases/member/profileManagement/updateProfileUseCase";
import { UploadProfilePictureUseCase } from "../../../application/useCases/member/profileManagement/uploadProfilePictureUseCase";
import { ViewMemberProfileUseCase } from "../../../application/useCases/member/profileManagement/viewProfileUseCase";
import { CancelSessionUseCase } from "../../../application/useCases/member/slotAndBookingManagement/cancelSessionUseCase";
import { CreateMemberSessionCheckoutSessionUseCase } from "../../../application/useCases/member/slotAndBookingManagement/createMemberSessionCheckoutSessionUseCase";
import { ListAllAvailableSlotUseCase } from "../../../application/useCases/member/slotAndBookingManagement/listAllAvailableSlotUseCase";
import { ListAllSessionsUseCase } from "../../../application/useCases/member/slotAndBookingManagement/listAllSessionUseCase";
import { CreateWorkoutPlanUseCase } from "../../../application/useCases/member/workoutPlanManagement/createWorkoutPlanUseCase";
import { ListWorkoutPlanUseCase } from "../../../application/useCases/member/workoutPlanManagement/listWorkoutPlnaUseCase";
import { DietPlanController } from "../../../presentation/controller/member/dietPlanController";
import { MemberLoginController } from "../../../presentation/controller/member/memberLoginController";
import { MemberLogoutController } from "../../../presentation/controller/member/memberLogoutController";
import { PackageListAndCheckoutController } from "../../../presentation/controller/member/packageListAndPurchaseController";
import { ProfileController } from "../../../presentation/controller/member/profileManagementController";
import { SlotAndBookingController } from "../../../presentation/controller/member/slotAndBookingController";
import { TrainerController } from "../../../presentation/controller/member/trainerManagementController";
import { WorkoutPlanController } from "../../../presentation/controller/member/workoutPlanController";
import { CheckMemberAccessMiddleWare } from "../../../presentation/middlewares/checkMemberAccessMiddleware";
import { branchModel } from "../../repository/databaseConfigs/models/branchModel";
import { dietPlanModel } from "../../repository/databaseConfigs/models/deitPlanModel";
import { gymAdminModel } from "../../repository/databaseConfigs/models/gymAdminModel";
import { memberModel } from "../../repository/databaseConfigs/models/memberModel";
import { PackageModel } from "../../repository/databaseConfigs/models/packageModel";
import { gymAdminRevenueModel } from "../../repository/databaseConfigs/models/revenueModel";
import { sessionModel } from "../../repository/databaseConfigs/models/sessionModel";
import { slotRuleModel } from "../../repository/databaseConfigs/models/slotRuleModel";
import { trainerLeaveModel } from "../../repository/databaseConfigs/models/trainerLeaveModel";
import { trainerModel } from "../../repository/databaseConfigs/models/trainerModel";
import { workoutPlanModel } from "../../repository/databaseConfigs/models/workoutPlanModel";
import { BranchRepository } from "../../repository/gymAdmin/branchRepo";
import { GymAdminRepository } from "../../repository/gymAdmin/gymAdminRepo";
import { PackageRepository } from "../../repository/gymAdmin/packageRepo";
import { GymAdminRevenueRepository } from "../../repository/gymAdmin/revenueRepo";
import { DietPlanRepository } from "../../repository/member/dietPlanRepo";
import { MemberRepository } from "../../repository/member/memberRepo";
import { SessionRepository } from "../../repository/member/sessionRepo";
import { WorkoutPlanRepository } from "../../repository/member/workoutPlanRepo";
import { LeaveRepository } from "../../repository/shared/leaveRepo";
import { SlotRuleRepository } from "../../repository/trainer/slotRuleRepo";
import { TrainerRepository } from "../../repository/trainer/trainerRepo";
import { CacheService } from "../../services/cacheService";
import { HashPassword } from "../../services/hashService";
import { JwtService } from "../../services/jwtService";
import { RRuleService } from "../../services/RRuleService";
import { stripe } from "../../services/stripeClient";
import { StripeService } from "../../services/stripeService";

const memberRepository = new MemberRepository(memberModel);
const gymAdminRepository = new GymAdminRepository(gymAdminModel);
const packageRepository = new PackageRepository(PackageModel);
const revenueRepository = new GymAdminRevenueRepository(gymAdminRevenueModel);
const workoutPlanRepository = new WorkoutPlanRepository(workoutPlanModel);
const dietPlanRepository = new DietPlanRepository(dietPlanModel);
const slotRuleRepository = new SlotRuleRepository(slotRuleModel);
const sessionRepository = new SessionRepository(sessionModel);
const trainerRepository = new TrainerRepository(trainerModel);
const trainerLeaveRepository = new LeaveRepository(trainerLeaveModel);
const hashService = new HashPassword();
const jwtService = new JwtService();
const cacheService = new CacheService();
const branchRepository = new BranchRepository(branchModel);
const stripeService = new StripeService(stripe);
const loginUseCase = new MemberLoginUseCase(
  memberRepository,
  hashService,
  gymAdminRepository,
);
export const injectedMemberLoginController = new MemberLoginController(
  loginUseCase,
  jwtService,
);
export const injectedCheckMemberAccessMiddleWare =
  new CheckMemberAccessMiddleWare(
    gymAdminRepository,
    branchRepository,
    memberRepository,
  );
const updateProfile = new UpdateProfileUseCase(memberRepository);
const uploadProfilePicture = new UploadProfilePictureUseCase(memberRepository);
const changePassword = new ChangePasswordUseCase(memberRepository, hashService);
const deleteProfilePicture = new DeleteProfilePictureUseCase(memberRepository);
const viewMemberProfile = new ViewMemberProfileUseCase(memberRepository);
const tokenInvalidatUseCase = new TokenValidationUseCase(
  jwtService,
  cacheService,
);
const listActivePackages = new ListActivePackagesUseCase(
  memberRepository,
  packageRepository,
);
const createCheckoutUseCase = new CreateMemberCheckoutSessionUseCase(
  packageRepository,
  memberRepository,
);
export const injectedMemberProfileController = new ProfileController(
  viewMemberProfile,
  updateProfile,
  uploadProfilePicture,
  deleteProfilePicture,
  changePassword,
);
export const injectedMemberLogoutController = new MemberLogoutController(
  tokenInvalidatUseCase,
);
const listAllPayments = new ListAllPaymentsUseCase(revenueRepository);

export const injectedPackageListAndCheckoutController =
  new PackageListAndCheckoutController(
    listActivePackages,
    createCheckoutUseCase,
    listAllPayments,
  );

//workout plan managemente
const createWorkoutPlanUseCase = new CreateWorkoutPlanUseCase(
  workoutPlanRepository,
  memberRepository,
);
const listWorkoutUseCase = new ListWorkoutPlanUseCase(workoutPlanRepository);
export const injectedWorkoutPlanController = new WorkoutPlanController(
  createWorkoutPlanUseCase,
  listWorkoutUseCase,
);

//diet plan management
const createDietPlanUseCase = new CreateDietPlanUseCase(
  dietPlanRepository,
  memberRepository,
);
const listDietPlnaUseCase = new ListDietPlanUseCase(dietPlanRepository);

export const injectedDietPlanController = new DietPlanController(
  createDietPlanUseCase,
  listDietPlnaUseCase,
);

// slot and session booking management
const rRuleService = new RRuleService();
const listAvailableSlotUseCase = new ListAllAvailableSlotUseCase(
  memberRepository,
  slotRuleRepository,
  rRuleService,
  sessionRepository,
  cacheService,
  trainerLeaveRepository,
);

const createMemberSessionCheckoutUseCase =
  new CreateMemberSessionCheckoutSessionUseCase(
    memberRepository,
    cacheService,
    sessionRepository,
    stripeService,
  );
const listAllSessionUseCase = new ListAllSessionsUseCase(sessionRepository);
const cancelSessionUseCase = new CancelSessionUseCase(
  revenueRepository,
  sessionRepository,
  memberRepository,
  stripeService,
);

export const injectedSlotAndBookingController = new SlotAndBookingController(
  listAvailableSlotUseCase,
  createMemberSessionCheckoutUseCase,
  listAllSessionUseCase,
  cancelSessionUseCase,
);

//trainer management
const listActiveTrainersUseCase = new ListActiveTrainersUseCase(
  trainerRepository,
  memberRepository,
  trainerLeaveRepository,
);
export const injectedtrainerController = new TrainerController(
  listActiveTrainersUseCase,
);
