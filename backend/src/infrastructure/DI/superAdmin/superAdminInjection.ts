import { TokenValidationUseCase } from "../../../application/useCases/auth/tokenValidationUseCase";
import { SubscriptionUseCase } from "../../../application/useCases/superAdmin/subscriptionUseCase";
import { SuperAdminUseCase } from "../../../application/useCases/superAdmin/superAdminLoginUseCase";
import { SubscriptionController } from "../../../presentation/controller/superAdmin/subscriptionController";
import { SuperAdminController } from "../../../presentation/controller/superAdmin/superAdminLoginController";
import { subscriptionModel } from "../../repository/databaseConfigs/models/subscriptionModel";
import { superAdminModel } from "../../repository/databaseConfigs/models/superAdminModel";
import { SubscriptionRepository } from "../../repository/superAdmin/subscriptionRepo";
import { SuperAdminRepository } from "../../repository/superAdmin/superAdminRepo";
import { CacheService } from "../../services/cacheService";
import { JwtService } from "../../services/jwtService";


const superAdminRepo = new SuperAdminRepository(superAdminModel)
const injectedSuperAdminUseCase = new SuperAdminUseCase(superAdminRepo)
const jwtservice = new JwtService()
const cacheService = new CacheService();
const tokenValidationUseCase = new TokenValidationUseCase(jwtservice,cacheService);
export const injectedSuperAdminController = new SuperAdminController(injectedSuperAdminUseCase,jwtservice,tokenValidationUseCase);

const subscriptionRepo = new SubscriptionRepository(subscriptionModel);
const injectedSubscriptionUseCase = new SubscriptionUseCase(subscriptionRepo)
export const injectedSubscriptionController= new SubscriptionController(injectedSubscriptionUseCase)

