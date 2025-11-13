import { superAdminModel } from "../../infrastructure/repository/databaseConfigs/models/superAdminModel";
import { SuperAdminRepository } from "../../infrastructure/repository/superAdmin/superAdminRepo";
import { SuperAdminController } from "../controller/superAdmin/superAdminLoginController";
import { ROUTES } from "../shared/constants/routes";
import { SuperAdminUseCase } from "../../application/useCases/superAdmin/superAdminLoginUseCase";
import { Response,Request,NextFunction,Router} from "express";
import { injectedSubscriptionController, injectedSuperAdminController } from "../../infrastructure/DI/superAdmin/superAdminInjection";


export class SuperAdminRoutes {
    private _route: Router;
    constructor (){
        this._route = Router();
        this._setRoute();
    }


    private _setRoute(){
        const SUPERADMIN_AUTH = ROUTES.AUTH.SUPERADMIN;

        this._route.post(SUPERADMIN_AUTH.LOGIN,(req:Request,res:Response,next:NextFunction)=>{
            console.log("in super admin routes", req.body)
            injectedSuperAdminController.superAdminLogin(req,res,next)
        });

        this._route.post(SUPERADMIN_AUTH.CREATE_SUBSCRIPTION,(req:Request,res:Response,next:NextFunction)=>{
            console.log("new subscription ",req.body);
            injectedSubscriptionController.createSubscription(req,res,next);
        });

        this._route.get(SUPERADMIN_AUTH.BLOCK_SUBSCRIPTION,(req:Request,res:Response,next:NextFunction)=>{
            injectedSubscriptionController.blockSubscription(req,res,next)
        });

        this._route.get(SUPERADMIN_AUTH.UNBLOCK_SUBSCRIPTION,(req:Request,res:Response,next:NextFunction)=>{
            injectedSubscriptionController.unBlockSubscription(req,res,next)
        });

        this._route.get(SUPERADMIN_AUTH.FIND_SUBSCRIPTION,(req:Request,res:Response,next:NextFunction)=>{
            injectedSubscriptionController.findSubscription(req,res,next)
        });

        this._route.get(SUPERADMIN_AUTH.UPDATE_SUBSCRIPTION,(req:Request,res:Response,next:NextFunction)=>{
            injectedSubscriptionController.updateSubscription(req,res,next)
        });

        this._route.get(SUPERADMIN_AUTH.LIST_SUBSCRIPTION,(req:Request,res:Response,next:NextFunction)=>{
            injectedSubscriptionController.listAllSubscription(req,res,next);
        })


    }

    public get_routes():Router{
        return this._route;
    }
}