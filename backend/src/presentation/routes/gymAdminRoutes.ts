import { ROUTES } from "../shared/constants/routes";
import { Request, Response, NextFunction, Router } from "express";
import { injectAuthMiddleware, injectedBranchController, injectedGymAdminLoginController, injectedGymAdminLogoutController, injectedGymAdminSingUpController, injectedListSubscriptionController, injectedPurchaseSubscriptionController, injectTrainerManagementController } from "../../infrastructure/DI/gymAdmin/gymAdminInjection";
import { upload } from "../middlewares/multer";

export class GymAdminRoutes {
  private _route: Router;
  constructor() {
    this._route = Router();
    this._setRoute();
  }

  private _setRoute() {
    const GYMADMIN = ROUTES.GYMADMIN;

    this._route.post(
      GYMADMIN.AUTH.EMAIL_VERIFY,
      (req: Request, res: Response, next: NextFunction) => {
        console.log("req body", req.body)
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
    this._route.use(injectAuthMiddleware.verify);
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
    );
    this._route.get(
      GYMADMIN.LISTSUBSCRIPTION,
      (req:Request,res:Response,next:NextFunction)=>{
        injectedListSubscriptionController.listAllActiveSubscription(req,res,next);
      }
    );
    this._route.post(
      GYMADMIN.PURCHASESUBSCRIPTION,
      (req:Request,res:Response,next:NextFunction)=>{
        injectedPurchaseSubscriptionController.handle(req,res,next);
      }
    );
    this._route.post(
      GYMADMIN.CREATE_BRANCH,
      (req:Request,res:Response,next:NextFunction)=>{
        injectedBranchController.createBranch(req,res,next);
      }
    );
    this._route.get(
      GYMADMIN.LIST_BRANCH,
      (req:Request,res:Response,next:NextFunction)=>{
        injectedBranchController.listBranches(req,res,next);
      }
    );
    this._route.put(
      GYMADMIN.BLOCK_BRANCH,
      (req:Request,res:Response,next:NextFunction)=>{
        injectedBranchController.blockBranch(req,res,next);
      }
    );
    this._route.put(
      GYMADMIN.UNBLOCK_BRANCH,
      (req:Request,res:Response,next:NextFunction)=>{
        injectedBranchController.unBlockBranch(req,res,next);
      }
    )
    this._route.get(
      GYMADMIN.FIND_BRANCH,
      (req:Request,res:Response,next:NextFunction)=>{
        injectedBranchController.findBranch(req,res,next);
      }
    )
    this._route.post(
      GYMADMIN.UPDATE_BRANCH,
      (req:Request,res:Response,next:NextFunction)=>{
        injectedBranchController.updateBranch(req,res,next);
      }
    )
  }

  public get_routes(): Router {
    return this._route;
  }
}
