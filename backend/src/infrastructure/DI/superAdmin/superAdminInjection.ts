import { SubscriptionUseCase } from "../../../application/useCases/superAdmin/subscriptionUseCase";
import { SuperAdminUseCase } from "../../../application/useCases/superAdmin/superAdminLoginUseCase";
import { SubscriptionController } from "../../../presentation/controller/superAdmin/subscriptionController";
import { SuperAdminController } from "../../../presentation/controller/superAdmin/superAdminLoginController";
import { subscriptionModel } from "../../repository/databaseConfigs/models/subscriptionModel";
import { superAdminModel } from "../../repository/databaseConfigs/models/superAdminModel";
import { SubscriptionRepository } from "../../repository/superAdmin/subscriptionRepo";
import { SuperAdminRepository } from "../../repository/superAdmin/superAdminRepo";


const superAdminRepo = new SuperAdminRepository(superAdminModel)
const injectedSuperAdminUseCase = new SuperAdminUseCase(superAdminRepo)
export const injectedSuperAdminController = new SuperAdminController(injectedSuperAdminUseCase)

const subscriptionRepo = new SubscriptionRepository(subscriptionModel);
const injectedSubscriptionUseCase = new SubscriptionUseCase(subscriptionRepo)
export const injectedSubscriptionController= new SubscriptionController(injectedSubscriptionUseCase)

