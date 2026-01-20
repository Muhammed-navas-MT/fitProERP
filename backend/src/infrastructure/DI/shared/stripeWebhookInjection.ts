import { ProcessStripeWebhookUseCase } from "../../../application/useCases/gymAdmin/ProcessStripeWebhookUseCase";
import { MemberProcessStripeWebhookUseCase } from "../../../application/useCases/member/packageAndPurchaseManagement/processStripWebhookUseCase";
import { StripeWebhookRouterUseCase } from "../../../application/useCases/shared/stripeWebhookRouterUseCase";
import { StripeWebhookController } from "../../../presentation/controller/shared/stripeWebhookHandler";
import { gymAdminModel } from "../../repository/databaseConfigs/models/gymAdminModel";
import { memberModel } from "../../repository/databaseConfigs/models/memberModel";
import { PackageModel } from "../../repository/databaseConfigs/models/packageModel";
import { subscriptionModel } from "../../repository/databaseConfigs/models/subscriptionModel";
import { paymentModel } from "../../repository/databaseConfigs/models/superAdminPaymentModel";
import { GymAdminRepository } from "../../repository/gymAdmin/gymAdminRepo";
import { PackageRepository } from "../../repository/gymAdmin/packageRepo";
import { MemberRepository } from "../../repository/member/memberRepo";
import { SuperAdminPaymentRepository } from "../../repository/superAdmin/paymentRepo";
import { SubscriptionRepository } from "../../repository/superAdmin/subscriptionRepo";

const paymentRepository = new SuperAdminPaymentRepository(paymentModel);
const gymAdminRepository = new GymAdminRepository(gymAdminModel);
const subscriptionRepository = new SubscriptionRepository(subscriptionModel)
const memberRepository = new MemberRepository(memberModel);
const packageRepository = new PackageRepository(PackageModel);
const processStripeWebhookUseCase = new ProcessStripeWebhookUseCase(paymentRepository,gymAdminRepository,subscriptionRepository);
const memberProcessStripeWebhookUseCase = new MemberProcessStripeWebhookUseCase(memberRepository,packageRepository)
const stripeWebhookRouteUseCase = new StripeWebhookRouterUseCase(processStripeWebhookUseCase,memberProcessStripeWebhookUseCase);
export const injectedStripeWebhookHelper = new StripeWebhookController(stripeWebhookRouteUseCase)