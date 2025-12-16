import { ROUTES } from "../shared/constants/routes";
import { Request,Response,NextFunction,Router } from "express";
import { injectedAddMemberController, injectedTrainerLoginController, injectedTrainerSignUpController } from "../../infrastructure/DI/trainer/trainerInjection";
export class TrainerRoutes {
    private _route:Router;
    constructor(){
        this._route = Router();
        this._setRoute();
    };

    private _setRoute(){
        const TRAINER = ROUTES.TRAINER;
        this._route.post(TRAINER.AUTH.SIGNUP,(req:Request,res:Response,next:NextFunction)=>{
            injectedTrainerSignUpController.signup(req,res,next);
        });
        this._route.post(TRAINER.ADD_MEMBER,(req:Request,res:Response,next:NextFunction)=>{
            console.log(req.body,"from add new member.....")
            injectedAddMemberController.addMember(req,res,next);
        })
        this._route.post(TRAINER.AUTH.LOGIN,(req:Request,res:Response,next:NextFunction)=>{
        console.log("req....",req.body)
            injectedTrainerLoginController.login(req,res,next);
        })
        this._route.get(TRAINER.LIST_MEMBER,(req:Request,res:Response,next:NextFunction)=>{
            console.log("list add members.....");
            injectedAddMemberController.listAllMembers(req,res,next);
        })
    };

    public get_routes():Router{
        return this._route;
    }
}