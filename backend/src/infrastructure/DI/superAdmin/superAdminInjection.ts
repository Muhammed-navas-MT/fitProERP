import { TokenValidationUseCase } from "../../../application/useCases/auth/tokenValidationUseCase";
import { blockGymUseCase } from "../../../application/useCases/superAdmin/gymMangement/blockGymUseCase";
import { ListGymUseCase } from "../../../application/useCases/superAdmin/gymMangement/listGymUseCase";
import { UnBlockGymUseCase } from "../../../application/useCases/superAdmin/gymMangement/unBlockGymUseCase";
import { BlockSubscriptionUseCase } from "../../../application/useCases/superAdmin/subscription/blockSubscriptionUseCase";
import { CreateSubscriptionUseCase } from "../../../application/useCases/superAdmin/subscription/createSubscriptionUseCase";
import { FindSubscripitionUseCase } from "../../../application/useCases/superAdmin/subscription/findSubscripitionUseCase";
import { ListSubscriptionsUseCase } from "../../../application/useCases/superAdmin/subscription/listSubscriptionsUseCase";
import { UnBlockSubscriptionUseCase } from "../../../application/useCases/superAdmin/subscription/unBlockSubscriptionUseCase";
import { UpdateSubscriptionUseCase } from "../../../application/useCases/superAdmin/subscription/updateSubscriptionUseCase";
import { SuperAdminUseCase } from "../../../application/useCases/superAdmin/superAdminLoginUseCase";
import { GymAdminManagementController } from "../../../presentation/controller/superAdmin/gymAdminManagementController";
import { SubscriptionController } from "../../../presentation/controller/superAdmin/subscriptionController";
import { SuperAdminController } from "../../../presentation/controller/superAdmin/superAdminLoginController";
import { gymAdminModel } from "../../repository/databaseConfigs/models/gymAdminModel";
import { subscriptionModel } from "../../repository/databaseConfigs/models/subscriptionModel";
import { superAdminModel } from "../../repository/databaseConfigs/models/superAdminModel";
import { trainerModel } from "../../repository/databaseConfigs/models/trainerModel";
import { GymAdminRepository } from "../../repository/gymAdmin/gymAdminRepo";
import { SubscriptionRepository } from "../../repository/superAdmin/subscriptionRepo";
import { SuperAdminRepository } from "../../repository/superAdmin/superAdminRepo";
import { TrainerRepository } from "../../repository/trainer/trainerRepo";
import { CacheService } from "../../services/cacheService";
import { JwtService } from "../../services/jwtService";


const superAdminRepo = new SuperAdminRepository(superAdminModel)
const injectedSuperAdminUseCase = new SuperAdminUseCase(superAdminRepo)
const jwtservice = new JwtService()
const cacheService = new CacheService();
const tokenValidationUseCase = new TokenValidationUseCase(jwtservice,cacheService);
export const injectedSuperAdminController = new SuperAdminController(injectedSuperAdminUseCase,jwtservice,tokenValidationUseCase);

const subscriptionRepo = new SubscriptionRepository(subscriptionModel);
const createSubscription = new CreateSubscriptionUseCase(subscriptionRepo)
const blockSubscription = new BlockSubscriptionUseCase(subscriptionRepo);
const findSubscripition = new FindSubscripitionUseCase(subscriptionRepo);
const listSubscription = new ListSubscriptionsUseCase(subscriptionRepo);
const unBlockSubscription = new UnBlockSubscriptionUseCase(subscriptionRepo);
const updateSubscription = new UpdateSubscriptionUseCase(subscriptionRepo);
export const injectedSubscriptionController= new SubscriptionController(
    blockSubscription,
    createSubscription,
    findSubscripition,
    listSubscription,
    unBlockSubscription,
    updateSubscription
);

//gym admin controller
const gymAdminRepository = new GymAdminRepository(gymAdminModel);
const trainerRepository = new TrainerRepository(trainerModel);
const listGyms = new ListGymUseCase(gymAdminRepository,trainerRepository);
const blockGym = new blockGymUseCase(gymAdminRepository);
const unBlockGym = new UnBlockGymUseCase(gymAdminRepository);
export const injectedGymManagementController = new GymAdminManagementController(listGyms,blockGym,unBlockGym)

