import { ROUTES } from "../shared/constants/routes";
import { Request,Response,NextFunction,Router } from "express";
import { injectedAddMemberController, injectedCheckAccessTrainerMiddleware, injectedProfileController, injectedTrainerLoginController, injectedTrainerLogoutController } from "../../infrastructure/DI/trainer/trainerInjection";
import { injectAuthMiddleware } from "../../infrastructure/DI/gymAdmin/gymAdminInjection";
import { injectedAttendanceController } from "../../infrastructure/DI/shared/attendanceInjection";
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

        this._route.post(TRAINER.AUTH.LOGOUT,(req:Request,res:Response,next:NextFunction)=>{
            injectedTrainerLogoutController.trainerLogout(req,res,next);
        })

        this._route.post(TRAINER.ADD_MEMBER,(req:Request,res:Response,next:NextFunction)=>{
            injectedAddMemberController.addMember(req,res,next);
        })

        this._route.get(TRAINER.LIST_MEMBER,(req:Request,res:Response,next:NextFunction)=>{
            injectedAddMemberController.listAllMembers(req,res,next);
        })
        
        this._route.get(TRAINER.LIST_ACTIVE_TRAINER,(req:Request,res:Response,next:NextFunction)=>{
            injectedAddMemberController.listAllActiveTrainers(req,res,next);
        })

        this._route.get(TRAINER.VIEW_PROFILE,(req:Request,res:Response,next:NextFunction)=>{
            injectedProfileController.viewProfile(req,res,next)
        })

        this._route.post(TRAINER.CHANGE_PASSWORD,(req:Request,res:Response,next:NextFunction)=>{
            injectedProfileController.changePassword(req,res,next)
        })

        this._route.post(TRAINER.UPDATE_PROFILE,(req:Request,res:Response,next:NextFunction)=>{
            injectedProfileController.updateProfile(req,res,next);
        })

        this._route.post(TRAINER.MARK_ATTENDANCE,(req:Request,res:Response,next:NextFunction)=>{
            injectedAttendanceController.markAttendance(req,res,next);
        })

        this._route.post(TRAINER.MARK_ATTENDANCE,(req:Request,res:Response,next:NextFunction)=>{
            injectedAttendanceController.markAttendance(req,res,next);
        })

        this._route.post(TRAINER.CHECK_OUT_ATTENDANCE,(req:Request,res:Response,next:NextFunction)=>{
            injectedAttendanceController.updateAttendance(req,res,next);
        })

        this._route.get(TRAINER.GET_ATTENDANCE,(req:Request,res:Response,next:NextFunction)=>{
            injectedAttendanceController.getAttendance(req,res,next);
        })

        this._route.get(TRAINER.GET_ALL_ATTENDANCE,(req:Request,res:Response,next:NextFunction)=>{
            injectedAttendanceController.getAttendanceList(req,res,next);
        })
    };

    public get_routes():Router{
        return this._route;
    }
}