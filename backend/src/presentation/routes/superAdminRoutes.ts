import { ROUTES } from "../shared/constants/routes";
import { Response,Request,NextFunction,Router} from "express";
import { injectedGymManagementController, injectedSubscriptionController, injectedSuperAdminController } from "../../infrastructure/DI/superAdmin/superAdminInjection";
import { injectAuthMiddleware } from "../../infrastructure/DI/gymAdmin/gymAdminInjection";

export class SuperAdminRoutes {
    private _route: Router;
    constructor (){
        this._route = Router();
        this._setRoute();
    }


    private _setRoute(){
        const SUPERADMIN_AUTH = ROUTES.AUTH.SUPERADMIN;

        this._route.post(SUPERADMIN_AUTH.LOGIN,(req:Request,res:Response,next:NextFunction)=>{
            injectedSuperAdminController.superAdminLogin(req,res,next)
        });

        this._route.use(injectAuthMiddleware.verify)

        this._route.post(SUPERADMIN_AUTH.CREATE_SUBSCRIPTION,(req:Request,res:Response,next:NextFunction)=>{
            injectedSubscriptionController.createSubscription(req,res,next);
        });

        this._route.put(SUPERADMIN_AUTH.BLOCK_SUBSCRIPTION,(req:Request,res:Response,next:NextFunction)=>{
            injectedSubscriptionController.blockSubscription(req,res,next)
        });

        this._route.put(SUPERADMIN_AUTH.UNBLOCK_SUBSCRIPTION,(req:Request,res:Response,next:NextFunction)=>{
            injectedSubscriptionController.unBlockSubscription(req,res,next)
        });

        this._route.get(SUPERADMIN_AUTH.FIND_SUBSCRIPTION,(req:Request,res:Response,next:NextFunction)=>{
            injectedSubscriptionController.findSubscription(req,res,next)
        });

        this._route.put(SUPERADMIN_AUTH.UPDATE_SUBSCRIPTION,(req:Request,res:Response,next:NextFunction)=>{
            injectedSubscriptionController.updateSubscription(req,res,next)
        });

        this._route.get(SUPERADMIN_AUTH.LIST_SUBSCRIPTION,(req:Request,res:Response,next:NextFunction)=>{
            injectedSubscriptionController.listAllSubscription(req,res,next);
        });

        this._route.post(SUPERADMIN_AUTH.LOGOUT,(req:Request,res:Response,next:NextFunction)=>{
            injectedSuperAdminController.superAdminLogout(req,res,next);
        });

        this._route.get(SUPERADMIN_AUTH.LIST_GYM,(req:Request,res:Response,next:NextFunction)=>{
            injectedGymManagementController.listGyms(req,res,next);
        });

        this._route.put(SUPERADMIN_AUTH.BLOCK_GYM,(req:Request,res:Response,next:NextFunction)=>{
            injectedGymManagementController.blockGym(req,res,next);
        });

        this._route.put(SUPERADMIN_AUTH.UNBLOCK_GYM,(req:Request,res:Response,next:NextFunction)=>{
            injectedGymManagementController.unBlockGym(req,res,next);
        })
    }

    public get_routes():Router{
        return this._route;
    }
}