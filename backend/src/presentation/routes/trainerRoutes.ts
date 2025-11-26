import { ROUTES } from "../shared/constants/routes";
import { Request,Response,NextFunction,Router } from "express";
import { injectedAddMemberController, injectedTrainerSignUpController } from "../../infrastructure/DI/trainer/trainerInjection";
export class TrainerRoutes {
    private _route:Router;
    constructor(){
        this._route = Router();
        this._setRoute();
    };

    private _setRoute(){
        const TRAINER = ROUTES.TRAINER;

        this._route.post(TRAINER.AUTH.EMAIL_VERIFY,(req:Request,res:Response,next:NextFunction)=>{
            injectedTrainerSignUpController.verifyEmail(req,res,next);
        });
        this._route.post(TRAINER.AUTH.OTP_VERIFY,(req:Request,res:Response,next:NextFunction)=>{
            injectedTrainerSignUpController.verifyOtp(req,res,next);
        });
        this._route.post(TRAINER.AUTH.SIGNUP,(req:Request,res:Response,next:NextFunction)=>{
            injectedTrainerSignUpController.signup(req,res,next);
        });
        this._route.post(TRAINER.ADD_MEMBER,(req:Request,res:Response,next:NextFunction)=>{
            injectedAddMemberController.addMember(req,res,next);
        })
    };

    public get_routes():Router{
        return this._route;
    }
}