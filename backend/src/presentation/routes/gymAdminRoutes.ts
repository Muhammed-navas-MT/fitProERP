import { ROUTES } from "../shared/constants/routes";
import { Request, Response, NextFunction, Router } from "express";
import { injectedGymAdminLoginController, injectedGymAdminLogoutController, injectedGymAdminSingUpController, injectTrainerManagementController } from "../../infrastructure/DI/gymAdmin/gymAdminInjection";
import { upload } from "../middlewares/multer";
import { SubdomainMiddleware } from "../middlewares/subdomainMiddleware";

export class GymAdminRoutes {
  private _route: Router;
  private _middleware:SubdomainMiddleware
  constructor() {
    this._middleware = new SubdomainMiddleware;
    this._route = Router();
    this._setRoute();
  }

  private _setRoute() {
    const GYMADMIN = ROUTES.GYMADMIN;

    this._route.post(
      GYMADMIN.AUTH.EMAIL_VERIFY,
      (req: Request, res: Response, next: NextFunction) => {
        injectedGymAdminSingUpController.verifyEmail(req, res, next);
      }
    );
    this._route.post(
      GYMADMIN.AUTH.OTP_VERIFY,
      (req: Request, res: Response, next: NextFunction) => {
        injectedGymAdminSingUpController.verifyOtp(req, res, next);
      }
    );
    this._route.post(
      GYMADMIN.AUTH.SIGNUP,
      upload.fields([
        { name: "logo", maxCount: 1 },
        { name: "businessLicense", maxCount: 1 },
        { name: "insuranceCertificate", maxCount: 1 },
      ]),
      (req: Request, res: Response, next: NextFunction) => {
        injectedGymAdminSingUpController.signup(req, res, next);
      }
    );
    this._route.post(
      GYMADMIN.AUTH.LOGIN,
      this._middleware.verifySubdomain,
      (req:Request,res:Response,next:NextFunction) => {
        injectedGymAdminLoginController.login(req,res,next);
      }
    );
    this._route.post(
      GYMADMIN.AUTH.LOGOUT,
      this._middleware.verifySubdomain,
      (req:Request,res:Response,next:NextFunction)=>{
        injectedGymAdminLogoutController.gymAdminLogout(req,res,next);
      }
    );
    this._route.post(
      GYMADMIN.CREATE_TRAINER,
      (req:Request,res:Response,next:NextFunction)=>{
        injectTrainerManagementController.createTrainer(req,res,next);
      }
    );
    this._route.get(
      GYMADMIN.LISTTRAINER,
      (req:Request,res:Response,next:NextFunction)=>{
        injectTrainerManagementController.listAllTrainers(req,res,next);
      }
    )
  }

  public get_routes(): Router {
    return this._route;
  }
}
