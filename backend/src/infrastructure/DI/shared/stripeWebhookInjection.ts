import { ProcessStripeWebhookUseCase } from "../../../application/useCases/gymAdmin/ProcessStripeWebhookUseCase";
import { CreateNotificationUseCase } from "../../../application/useCases/shared/notificationManagement/createNotificationUseCase";
import { MemberProcessStripeWebhookUseCase } from "../../../application/useCases/member/packageAndPurchaseManagement/processStripWebhookUseCase";
import { MemberProcessSessionStripeWebhookUseCase } from "../../../application/useCases/member/slotAndBookingManagement/memberProcessSessionStripeWebhookUseCase";
import { StripeWebhookRouterUseCase } from "../../../application/useCases/shared/stripeWebhookRouterUseCase";
import { StripeWebhookController } from "../../../presentation/controller/shared/stripeWebhookHandler";
import { gymAdminModel } from "../../repository/databaseConfigs/models/gymAdminModel";
import { memberModel } from "../../repository/databaseConfigs/models/memberModel";
import { notificationModel } from "../../repository/databaseConfigs/models/notificationModel";
import { PackageModel } from "../../repository/databaseConfigs/models/packageModel";
import { gymAdminRevenueModel } from "../../repository/databaseConfigs/models/revenueModel";
import { sessionModel } from "../../repository/databaseConfigs/models/sessionModel";
import { subscriptionModel } from "../../repository/databaseConfigs/models/subscriptionModel";
import { paymentModel } from "../../repository/databaseConfigs/models/superAdminPaymentModel";
import { GymAdminRepository } from "../../repository/gymAdmin/gymAdminRepo";
import { PackageRepository } from "../../repository/gymAdmin/packageRepo";
import { GymAdminRevenueRepository } from "../../repository/gymAdmin/revenueRepo";
import { MemberRepository } from "../../repository/member/memberRepo";
import { SessionRepository } from "../../repository/member/sessionRepo";
import { NotificationRepository } from "../../repository/shared/notificationRepo";
import { SuperAdminPaymentRepository } from "../../repository/superAdmin/paymentRepo";
import { SubscriptionRepository } from "../../repository/superAdmin/subscriptionRepo";
import { CacheService } from "../../services/cacheService";
import { SocketService } from "../../services/socketService";
import { NotificationService } from "../../services/notificationService";

const paymentRepository = new SuperAdminPaymentRepository(paymentModel);
const gymAdminRepository = new GymAdminRepository(gymAdminModel);
const subscriptionRepository = new SubscriptionRepository(subscriptionModel);
const memberRepository = new MemberRepository(memberModel);
const packageRepository = new PackageRepository(PackageModel);
const sessionRepository = new SessionRepository(sessionModel);
const notificationRepositoy = new NotificationRepository(notificationModel);
const socketService = new SocketService();
const gymAdminRevenueRepository = new GymAdminRevenueRepository(
  gymAdminRevenueModel,
);
const cacheService = new CacheService();
const processStripeWebhookUseCase = new ProcessStripeWebhookUseCase(
  paymentRepository,
  gymAdminRepository,
  subscriptionRepository,
);
const createNotificationUseCase = new CreateNotificationUseCase(
  notificationRepositoy,
  socketService,
);
const notificationService = new NotificationService(createNotificationUseCase);
const memberProcessStripeWebhookUseCase = new MemberProcessStripeWebhookUseCase(
  gymAdminRevenueRepository,
  memberRepository,
  packageRepository,
  notificationService,
);
const memberProcessSessionWebhookUseCase =
  new MemberProcessSessionStripeWebhookUseCase(
    sessionRepository,
    gymAdminRevenueRepository,
    cacheService,
    memberRepository,
    createNotificationUseCase,
  );
const stripeWebhookRouteUseCase = new StripeWebhookRouterUseCase(
  processStripeWebhookUseCase,
  memberProcessStripeWebhookUseCase,
  memberProcessSessionWebhookUseCase,
);
export const injectedStripeWebhookHelper = new StripeWebhookController(
  stripeWebhookRouteUseCase,
);
