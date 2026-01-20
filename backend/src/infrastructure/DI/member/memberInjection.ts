import { TokenValidationUseCase } from "../../../application/useCases/auth/tokenValidationUseCase";
import { MemberLoginUseCase } from "../../../application/useCases/member/memberLoginUseCase";
import { CreateMemberCheckoutSessionUseCase } from "../../../application/useCases/member/packageAndPurchaseManagement/createMemberCheckoutUseCase";
import { ListActivePackagesUseCase } from "../../../application/useCases/member/packageAndPurchaseManagement/listActivepackagesUseCase";
import { ChangePasswordUseCase } from "../../../application/useCases/member/profileManagement/changePasswordUseCase";
import { DeleteProfilePictureUseCase } from "../../../application/useCases/member/profileManagement/deleteProfilePictureUseCase";
import { UpdateProfileUseCase } from "../../../application/useCases/member/profileManagement/updateProfileUseCase";
import { UploadProfilePictureUseCase } from "../../../application/useCases/member/profileManagement/uploadProfilePictureUseCase";
import { ViewMemberProfileUseCase } from "../../../application/useCases/member/profileManagement/viewProfileUseCase";
import { MemberLoginController } from "../../../presentation/controller/member/memberLoginController";
import { MemberLogoutController } from "../../../presentation/controller/member/memberLogoutController";
import { PackageListAndCheckoutController } from "../../../presentation/controller/member/packageListAndPurchaseController";
import { ProfileController } from "../../../presentation/controller/member/profileManagementController";
import { CheckMemberAccessMiddleWare } from "../../../presentation/middlewares/checkMemberAccessMiddleware";
import { branchModel } from "../../repository/databaseConfigs/models/branchModel";
import { gymAdminModel } from "../../repository/databaseConfigs/models/gymAdminModel";
import { memberModel } from "../../repository/databaseConfigs/models/memberModel";
import { PackageModel } from "../../repository/databaseConfigs/models/packageModel";
import { BranchRepository } from "../../repository/gymAdmin/branchRepo";
import { GymAdminRepository } from "../../repository/gymAdmin/gymAdminRepo";
import { PackageRepository } from "../../repository/gymAdmin/packageRepo";
import { MemberRepository } from "../../repository/member/memberRepo";
import { CacheService } from "../../services/cacheService";
import { HashPassword } from "../../services/hashService";
import { JwtService } from "../../services/jwtService";

const memberRepository = new MemberRepository(memberModel)
const gymAdminRepository = new GymAdminRepository(gymAdminModel)
const packageRepository = new PackageRepository(PackageModel);
const hashService = new  HashPassword()
const jwtService = new JwtService()
const cacheService = new CacheService();
const branchRepository = new BranchRepository(branchModel);
const loginUseCase = new MemberLoginUseCase(memberRepository,hashService,gymAdminRepository)
export const injectedMemberLoginController = new MemberLoginController(loginUseCase,jwtService);
export const injectedCheckMemberAccessMiddleWare = new CheckMemberAccessMiddleWare(gymAdminRepository,branchRepository,memberRepository);
const updateProfile = new UpdateProfileUseCase(memberRepository);
const uploadProfilePicture = new UploadProfilePictureUseCase(memberRepository);
const changePassword = new ChangePasswordUseCase(memberRepository,hashService);
const deleteProfilePicture = new DeleteProfilePictureUseCase(memberRepository);
const viewMemberProfile = new ViewMemberProfileUseCase(memberRepository);
const tokenInvalidatUseCase = new TokenValidationUseCase(jwtService,cacheService);
const listActivePackages = new ListActivePackagesUseCase(memberRepository,packageRepository)
const createCheckoutUseCase = new CreateMemberCheckoutSessionUseCase(packageRepository,memberRepository);
export const injectedMemberProfileController = new ProfileController(viewMemberProfile,updateProfile,uploadProfilePicture,deleteProfilePicture,changePassword);
export const injectedMemberLogoutController = new MemberLogoutController(tokenInvalidatUseCase);
export const injectedPackageListAndCheckoutController = new PackageListAndCheckoutController(listActivePackages,createCheckoutUseCase)