import { ROUTES } from "../shared/constants/routes";
import { Request,Response,NextFunction,Router } from "express";
import { injectedAddMemberController, injectedCheckAccessTrainerMiddleware, injectedTrainerLoginController } from "../../infrastructure/DI/trainer/trainerInjection";
import { injectAuthMiddleware } from "../../infrastructure/DI/gymAdmin/gymAdminInjection";
export class TrainerRoutes {
    private _route:Router;
    constructor(){
        this._route = Router();
        this._setRoute();
    };

    private _setRoute(){
        const TRAINER = ROUTES.TRAINER;
        this._route.post(TRAINER.AUTH.LOGIN,(req:Request,res:Response,next:NextFunction)=>{
            injectedTrainerLoginController.login(req,res,next);
        })

        this._route.use([
            injectAuthMiddleware.verify,
            injectedCheckAccessTrainerMiddleware.execute
        ]);

        this._route.post(TRAINER.ADD_MEMBER,(req:Request,res:Response,next:NextFunction)=>{
            injectedAddMemberController.addMember(req,res,next);
        })

        this._route.get(TRAINER.LIST_MEMBER,(req:Request,res:Response,next:NextFunction)=>{
            injectedAddMemberController.listAllMembers(req,res,next);
        })
        
        this._route.get(TRAINER.LIST_ACTIVE_TRAINER,(req:Request,res:Response,next:NextFunction)=>{
            injectedAddMemberController.listAllActiveTrainers(req,res,next);
        })
    };

    public get_routes():Router{
        return this._route;
    }
}