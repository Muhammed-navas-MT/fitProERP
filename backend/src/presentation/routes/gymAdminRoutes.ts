import { ROUTES } from "../shared/constants/routes";
import { Request,Response,NextFunction,Router } from "express";
import { injectedGymAdminSingUpController } from "../../infrastructure/DI/gymAdmin/gymAdminInjection";
import { upload } from "../middlewares/multer";

export class GymAdminRoutes {
    private _route:Router;
    constructor(){
        this._route = Router();
        this._setRoute();
    };

    private _setRoute(){
        const GYMADMIN = ROUTES.GYMADMIN;

        this._route.post(GYMADMIN.AUTH.EMAIL_VERIFY,(req:Request,res:Response,next:NextFunction)=>{
            injectedGymAdminSingUpController.verifyEmail(req,res,next);
        });
        this._route.post(GYMADMIN.AUTH.OTP_VERIFY,(req:Request,res:Response,next:NextFunction)=>{
            injectedGymAdminSingUpController.verifyOtp(req,res,next);
        });
        this._route.post(GYMADMIN.AUTH.SIGNUP,(req:Request,res:Response,next:NextFunction)=>{
            upload.fields([
                {name:"logo", maxCount:1},
                {name:"businessLicense", maxCount:1},
                {name:"insuranceCertificate",maxCount:1}
            ])
            injectedGymAdminSingUpController.signup(req,res,next);
        })
    };

    public get_routes():Router{
        return this._route;
    }
}