import { TokenValidationUseCase } from "../../../application/useCases/auth/tokenValidationUseCase";
import { ApproveGymUseCase } from "../../../application/useCases/superAdmin/gymMangement/approveGymUseCase";
import { blockGymUseCase } from "../../../application/useCases/superAdmin/gymMangement/blockGymUseCase";
import { FindGymUseCase } from "../../../application/useCases/superAdmin/gymMangement/findGymUseCase";
import { ListGymUseCase } from "../../../application/useCases/superAdmin/gymMangement/listGymUseCase";
import { RejectGymUseCase } from "../../../application/useCases/superAdmin/gymMangement/rejectGymUseCase";
import { UnBlockGymUseCase } from "../../../application/useCases/superAdmin/gymMangement/unBlockGymUseCase";
import { ListAllSubscription } from "../../../application/useCases/superAdmin/listAllActiveSubscriptionUseCase";
import { FindPaymentUseCase } from "../../../application/useCases/superAdmin/paymentManagement/findPaymentUseCase";
import { ListPaymentUseCase } from "../../../application/useCases/superAdmin/paymentManagement/listPaymentUseCase";
import { BlockSubscriptionUseCase } from "../../../application/useCases/superAdmin/subscription/blockSubscriptionUseCase";
import { CreateSubscriptionUseCase } from "../../../application/useCases/superAdmin/subscription/createSubscriptionUseCase";
import { FindSubscripitionUseCase } from "../../../application/useCases/superAdmin/subscription/findSubscripitionUseCase";
import { ListSubscriptionsUseCase } from "../../../application/useCases/superAdmin/subscription/listSubscriptionsUseCase";
import { UnBlockSubscriptionUseCase } from "../../../application/useCases/superAdmin/subscription/unBlockSubscriptionUseCase";
import { UpdateSubscriptionUseCase } from "../../../application/useCases/superAdmin/subscription/updateSubscriptionUseCase";
import { SuperAdminUseCase } from "../../../application/useCases/superAdmin/superAdminLoginUseCase";
import { GymAdminManagementController } from "../../../presentation/controller/superAdmin/gymAdminManagementController";
import { PaymentController } from "../../../presentation/controller/superAdmin/paymentController";
import { SubscriptionController } from "../../../presentation/controller/superAdmin/subscriptionController";
import { SuperAdminController } from "../../../presentation/controller/superAdmin/superAdminLoginController";
import { gymAdminModel } from "../../repository/databaseConfigs/models/gymAdminModel";
import { memberModel } from "../../repository/databaseConfigs/models/memberModel";
import { subscriptionModel } from "../../repository/databaseConfigs/models/subscriptionModel";
import { superAdminModel } from "../../repository/databaseConfigs/models/superAdminModel";
import { paymentModel } from "../../repository/databaseConfigs/models/superAdminPaymentModel";
import { trainerModel } from "../../repository/databaseConfigs/models/trainerModel";
import { GymAdminRepository } from "../../repository/gymAdmin/gymAdminRepo";
import { MemberRepository } from "../../repository/member/memberRepo";
import { SuperAdminPaymentRepository } from "../../repository/superAdmin/paymentRepo";
import { SubscriptionRepository } from "../../repository/superAdmin/subscriptionRepo";
import { SuperAdminRepository } from "../../repository/superAdmin/superAdminRepo";
import { TrainerRepository } from "../../repository/trainer/trainerRepo";
import { CacheService } from "../../services/cacheService";
import { ApproveGymEmailContentGenerator } from "../../services/IEmail/approveGymContentGenerator";
import { EmailService } from "../../services/IEmail/emailService";
import { RejectGymEmailContentGenerator } from "../../services/IEmail/rejectGymEmailContentGenerator";
import { JwtService } from "../../services/jwtService";

const superAdminRepo = new SuperAdminRepository(superAdminModel);
const paymentRepository = new SuperAdminPaymentRepository(paymentModel);
const injectedSuperAdminUseCase = new SuperAdminUseCase(superAdminRepo);
const jwtservice = new JwtService();
const cacheService = new CacheService();
const tokenValidationUseCase = new TokenValidationUseCase(
  jwtservice,
  cacheService,
);
export const injectedSuperAdminController = new SuperAdminController(
  injectedSuperAdminUseCase,
  jwtservice,
  tokenValidationUseCase,
);

const subscriptionRepo = new SubscriptionRepository(subscriptionModel);
const createSubscription = new CreateSubscriptionUseCase(subscriptionRepo);
const blockSubscription = new BlockSubscriptionUseCase(subscriptionRepo);
const findSubscripition = new FindSubscripitionUseCase(subscriptionRepo);
const listSubscription = new ListSubscriptionsUseCase(subscriptionRepo);
const unBlockSubscription = new UnBlockSubscriptionUseCase(subscriptionRepo);
const updateSubscription = new UpdateSubscriptionUseCase(subscriptionRepo);
const listAllActiveSubscription = new ListAllSubscription(subscriptionRepo);
export const injectedSubscriptionController = new SubscriptionController(
  blockSubscription,
  createSubscription,
  findSubscripition,
  listSubscription,
  unBlockSubscription,
  updateSubscription,
  listAllActiveSubscription,
);

//gym admin controller
const gymAdminRepository = new GymAdminRepository(gymAdminModel);
const trainerRepository = new TrainerRepository(trainerModel);
const memberRepository = new MemberRepository(memberModel);
const emailService = new EmailService();
const approveGymEmailContentGenerator = new ApproveGymEmailContentGenerator();
const rejectGymEmailContentGenerator = new RejectGymEmailContentGenerator();
const listGyms = new ListGymUseCase(gymAdminRepository, trainerRepository);
const blockGym = new blockGymUseCase(gymAdminRepository);
const unBlockGym = new UnBlockGymUseCase(gymAdminRepository);
const findgym = new FindGymUseCase(
  memberRepository,
  gymAdminRepository,
  trainerRepository,
  subscriptionRepo,
);
const approveGym = new ApproveGymUseCase(
  gymAdminRepository,
  emailService,
  approveGymEmailContentGenerator,
);
const rejectGym = new RejectGymUseCase(
  gymAdminRepository,
  emailService,
  rejectGymEmailContentGenerator,
);
export const injectedGymManagementController = new GymAdminManagementController(
  listGyms,
  blockGym,
  unBlockGym,
  findgym,
  approveGym,
  rejectGym,
);

const findPayment = new FindPaymentUseCase(
  paymentRepository,
  gymAdminRepository,
  subscriptionRepo,
);
const listAllPayments = new ListPaymentUseCase(paymentRepository);
export const injectedPaymentController = new PaymentController(
  listAllPayments,
  findPayment,
);
