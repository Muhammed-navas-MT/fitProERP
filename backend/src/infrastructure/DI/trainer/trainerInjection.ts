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
import { ListActiveBranchUseCase } from "../../../application/useCases/trainer/listActiveBranchUseCase";
import { ListAllActiveTrainersByBranch } from "../../../application/useCases/trainer/memberManagement/listAllActiveTrainersByBranchIdUseCase";
import { LeaveRepository } from "../../repository/shared/leaveRepo";
import { trainerLeaveModel } from "../../repository/databaseConfigs/models/trainerLeaveModel";
import { CreateLeaveUseCase } from "../../../application/useCases/trainer/leaveManagement/createLeaveUseCase";
import { FindLeaveUseCase } from "../../../application/useCases/trainer/leaveManagement/findLeaveUseCase";
import { UpdateLeaveUseCase } from "../../../application/useCases/trainer/leaveManagement/updateLeaveUseCase";
import { ListAllLeaveUseCase } from "../../../application/useCases/trainer/leaveManagement/listAllLeavesUseCase";
import { LeaveController } from "../../../presentation/controller/trainer/leaveManagementComtroller";
import { SlotRuleRepository } from "../../repository/trainer/slotRuleRepo";
import { slotRuleModel } from "../../repository/databaseConfigs/models/slotRuleModel";
import { CreateSlotRuleUseCase } from "../../../application/useCases/trainer/slotRuleManagement/createSlotRuleUseCase";
import { SlotRuleController } from "../../../presentation/controller/trainer/slotRuleController";
import { RRuleService } from "../../services/RRuleService";
import { FindSlotRuleUseCase } from "../../../application/useCases/trainer/slotRuleManagement/findSlotRuleUseCase";
import { UpdateSlotUseCase } from "../../../application/useCases/trainer/slotRuleManagement/updateSlotRuleUseCase";
import { SessionRepository } from "../../repository/member/sessionRepo";
import { sessionModel } from "../../repository/databaseConfigs/models/sessionModel";
import { ListTrainerSessionUseCase } from "../../../application/useCases/trainer/sessionManagement/listAllSessionUseCase";
import { SessionController } from "../../../presentation/controller/trainer/sessionController";
import { ListAllSlotUseCase } from "../../../application/useCases/trainer/slotRuleManagement/listAllAvailableSlotUseCase";
import { MarkAsCompletedUseCase } from "../../../application/useCases/trainer/sessionManagement/markAsCompletedUseCase";
import { NotificationRepository } from "../../repository/shared/notificationRepo";
import { notificationModel } from "../../repository/databaseConfigs/models/notificationModel";
import { CreateNotificationUseCase } from "../../../application/useCases/shared/notificationManagement/createNotificationUseCase";
import { SocketService } from "../../services/socketService";
import { NotificationService } from "../../services/notificationService";

const emailService = new EmailService();
const hashService = new HashPassword();
const sendPasswordEmailContentGenerator =
  new SendPasswordEmailContentGenerator();
const trainerRepository = new TrainerRepository(trainerModel);
const gymAdminRepository = new GymAdminRepository(gymAdminModel);
const leaveRepository = new LeaveRepository(trainerLeaveModel);
const slotRuleRepository = new SlotRuleRepository(slotRuleModel);
const sessionRepository = new SessionRepository(sessionModel);
const notificationRepository = new NotificationRepository(notificationModel);
const socketService = new SocketService();
const createNotificationUseCase = new CreateNotificationUseCase(
  notificationRepository,
  socketService,
);
const notificationService = new NotificationService(createNotificationUseCase);
const loginUseCase = new TrainerLoginUseCase(
  trainerRepository,
  hashService,
  gymAdminRepository,
);
const jwtService = new JwtService();
const cacheService = new CacheService();
const tokenInValidation = new TokenValidationUseCase(jwtService, cacheService);
export const injectedTrainerLoginController = new TrainerLoginController(
  loginUseCase,
  jwtService,
);
export const injectedTrainerLogoutController = new TrainerLogoutController(
  tokenInValidation,
);

const branchRepository = new BranchRepository(branchModel);
export const injectedCheckAccessTrainerMiddleware =
  new CheckTrainerAccessMiddleWare(
    gymAdminRepository,
    branchRepository,
    trainerRepository,
  );

//member management
const memberRepository = new MemberRepository(memberModel);
const generatePassword = new PasswordGenerator();
const createMember = new CreateMemberUseCase(
  memberRepository,
  hashService,
  emailService,
  generatePassword,
  sendPasswordEmailContentGenerator,
  gymAdminRepository,
  trainerRepository,
  notificationService,
);
const findMember = new FindMemberUseCase(memberRepository);
const updateMember = new UpdateMemberUseCase(memberRepository);
const listAllMembers = new ListAllMembers(
  memberRepository,
  gymAdminRepository,
  trainerRepository,
);
const blockMember = new BlockMemberUseCase(memberRepository);
const unBlockMember = new UnBlockMemberUseCase(memberRepository);
const listActiveTrainers = new ListActiveTrainers(
  trainerRepository,
  gymAdminRepository,
);
const listActiveBranch = new ListActiveBranchUseCase(
  branchRepository,
  trainerRepository,
);
const listActiveTrainersByBranchId = new ListAllActiveTrainersByBranch(
  trainerRepository,
);
export const injectedMemberController = new MemberController(
  createMember,
  findMember,
  updateMember,
  unBlockMember,
  blockMember,
  listAllMembers,
  listActiveTrainers,
  listActiveBranch,
  listActiveTrainersByBranchId,
);

//profile management
const changePassword = new ChangePasswordUseCase(
  trainerRepository,
  hashService,
);
const updateProfile = new UpdateProfileUseCase(trainerRepository);
const viewProfile = new ViewProfileUseCase(trainerRepository);
export const injectedProfileController = new ProfileManagementController(
  changePassword,
  updateProfile,
  viewProfile,
);

//leave management
const createLeaveuseCase = new CreateLeaveUseCase(
  leaveRepository,
  trainerRepository,
  notificationService,
);
const findLeaveUseCase = new FindLeaveUseCase(leaveRepository);
const updateLeaveUseCase = new UpdateLeaveUseCase(
  leaveRepository,
  trainerRepository,
);
const listLeaveUseCase = new ListAllLeaveUseCase(
  leaveRepository,
  trainerRepository,
);
export const injectedLeaveController = new LeaveController(
  createLeaveuseCase,
  findLeaveUseCase,
  listLeaveUseCase,
  updateLeaveUseCase,
);

//slot rul management
const rRuleService = new RRuleService();
const createSlotRuleUseCase = new CreateSlotRuleUseCase(
  slotRuleRepository,
  rRuleService,
  trainerRepository,
);
const findSlotRuleUseCase = new FindSlotRuleUseCase(slotRuleRepository);
const updateSlotRuleUseCase = new UpdateSlotUseCase(
  slotRuleRepository,
  rRuleService,
  trainerRepository,
);
const listAllSlotUseCase = new ListAllSlotUseCase(
  slotRuleRepository,
  rRuleService,
  sessionRepository,
);

export const injectedSlotRuleController = new SlotRuleController(
  createSlotRuleUseCase,
  findSlotRuleUseCase,
  updateSlotRuleUseCase,
  listAllSlotUseCase,
);

//session management
const listTrainerSessionUseCase = new ListTrainerSessionUseCase(
  sessionRepository,
);
const markAsCompletedUseCase = new MarkAsCompletedUseCase(sessionRepository);

export const injectedSessionController = new SessionController(
  listTrainerSessionUseCase,
  markAsCompletedUseCase,
);
