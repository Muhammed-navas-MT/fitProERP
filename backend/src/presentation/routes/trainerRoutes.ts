import { ROUTES } from "../shared/constants/routes";
import { Request,Response,NextFunction,Router } from "express";
import { injectedAddMemberController, injectedTrainerLoginController } from "../../infrastructure/DI/trainer/trainerInjection";
export class TrainerRoutes {
    private _route:Router;
    constructor(){
        this._route = Router();
        this._setRoute();
    };

    private _setRoute(){
        const TRAINER = ROUTES.TRAINER;
        this._route.post(TRAINER.ADD_MEMBER,(req:Request,res:Response,next:NextFunction)=>{
            injectedAddMemberController.addMember(req,res,next);
        })
        this._route.post(TRAINER.AUTH.LOGIN,(req:Request,res:Response,next:NextFunction)=>{
            injectedTrainerLoginController.login(req,res,next);
        })
        this._route.get(TRAINER.LIST_MEMBER,(req:Request,res:Response,next:NextFunction)=>{
            injectedAddMemberController.listAllMembers(req,res,next);
        })
    };

    public get_routes():Router{
        return this._route;
    }
}