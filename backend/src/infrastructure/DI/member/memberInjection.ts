import { TokenValidationUseCase } from "../../../application/useCases/auth/tokenValidationUseCase";
import { CreateDietPlanUseCase } from "../../../application/useCases/member/dietPlanManagement/createDietPlanUseCase";
import { ListDietPlanUseCase } from "../../../application/useCases/member/dietPlanManagement/listDietPlanUseCase";
import { MemberLoginUseCase } from "../../../application/useCases/member/memberLoginUseCase";
import { CreateMemberCheckoutSessionUseCase } from "../../../application/useCases/member/packageAndPurchaseManagement/createMemberCheckoutUseCase";
import { ListActivePackagesUseCase } from "../../../application/useCases/member/packageAndPurchaseManagement/listActivepackagesUseCase";
import { ListAllPaymentsUseCase } from "../../../application/useCases/member/packageAndPurchaseManagement/listAllPaymentsUseCase";
import { ChangePasswordUseCase } from "../../../application/useCases/member/profileManagement/changePasswordUseCase";
import { DeleteProfilePictureUseCase } from "../../../application/useCases/member/profileManagement/deleteProfilePictureUseCase";
import { UpdateProfileUseCase } from "../../../application/useCases/member/profileManagement/updateProfileUseCase";
import { UploadProfilePictureUseCase } from "../../../application/useCases/member/profileManagement/uploadProfilePictureUseCase";
import { ViewMemberProfileUseCase } from "../../../application/useCases/member/profileManagement/viewProfileUseCase";
import { CreateWorkoutPlanUseCase } from "../../../application/useCases/member/workoutPlanManagement/createWorkoutPlanUseCase";
import { ListWorkoutPlanUseCase } from "../../../application/useCases/member/workoutPlanManagement/listWorkoutPlnaUseCase";
import { DietPlanController } from "../../../presentation/controller/member/dietPlanController";
import { MemberLoginController } from "../../../presentation/controller/member/memberLoginController";
import { MemberLogoutController } from "../../../presentation/controller/member/memberLogoutController";
import { PackageListAndCheckoutController } from "../../../presentation/controller/member/packageListAndPurchaseController";
import { ProfileController } from "../../../presentation/controller/member/profileManagementController";
import { WorkoutPlanController } from "../../../presentation/controller/member/workoutPlanController";
import { CheckMemberAccessMiddleWare } from "../../../presentation/middlewares/checkMemberAccessMiddleware";
import { branchModel } from "../../repository/databaseConfigs/models/branchModel";
import { dietPlanModel } from "../../repository/databaseConfigs/models/deitPlanModel";
import { gymAdminModel } from "../../repository/databaseConfigs/models/gymAdminModel";
import { memberModel } from "../../repository/databaseConfigs/models/memberModel";
import { PackageModel } from "../../repository/databaseConfigs/models/packageModel";
import { gymAdminRevenueModel } from "../../repository/databaseConfigs/models/revenueModel";
import { workoutPlanModel } from "../../repository/databaseConfigs/models/workoutPlanModel";
import { BranchRepository } from "../../repository/gymAdmin/branchRepo";
import { GymAdminRepository } from "../../repository/gymAdmin/gymAdminRepo";
import { PackageRepository } from "../../repository/gymAdmin/packageRepo";
import { GymAdminRevenueRepository } from "../../repository/gymAdmin/revenueRepo";
import { DietPlanRepository } from "../../repository/member/dietPlanRepo";
import { MemberRepository } from "../../repository/member/memberRepo";
import { WorkoutPlanRepository } from "../../repository/member/workoutPlanRepo";
import { CacheService } from "../../services/cacheService";
import { HashPassword } from "../../services/hashService";
import { JwtService } from "../../services/jwtService";

const memberRepository = new MemberRepository(memberModel);
const gymAdminRepository = new GymAdminRepository(gymAdminModel);
const packageRepository = new PackageRepository(PackageModel);
const revenueRepository = new GymAdminRevenueRepository(gymAdminRevenueModel);
const workoutPlanRepository = new WorkoutPlanRepository(workoutPlanModel);
const dietPlanRepository = new DietPlanRepository(dietPlanModel);
const hashService = new HashPassword();
const jwtService = new JwtService();
const cacheService = new CacheService();
const branchRepository = new BranchRepository(branchModel);
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
