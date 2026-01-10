import { ROUTES } from "../shared/constants/routes";
import { Request, Response, NextFunction, Router } from "express";
import { injectAuthMiddleware, injectedBranchController, injectedGymAdminLoginController, injectedGymAdminLogoutController, injectedGymAdminProfileControler, injectedGymAdminSingUpController, injectedListSubscriptionController, injectedMemberManagementController, injectedPurchaseSubscriptionController, injectTrainerManagementController } from "../../infrastructure/DI/gymAdmin/gymAdminInjection";
import { upload } from "../middlewares/multer";
import { SubdomainMiddleware } from "../middlewares/subdomainMiddleware";

export class GymAdminRoutes {
  private _route: Router;
  private _middleware:SubdomainMiddleware
  constructor() {
    this._middleware = new SubdomainMiddleware();
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
    this._route.use(this._middleware.verifySubdomain);
    this._route.post(
      GYMADMIN.AUTH.LOGIN,
      (req:Request,res:Response,next:NextFunction) => {
        injectedGymAdminLoginController.login(req,res,next);
      }
    );
    this._route.use(injectAuthMiddleware.verify);
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
    );
    this._route.get(
      GYMADMIN.LIST_ACTIVE_TRAINERS,
      (req:Request,res:Response,next:NextFunction)=>{
        injectTrainerManagementController.listAllActiveTrainers(req,res,next);
      }
    );
    this._route.put(
      GYMADMIN.BLOCK_TRAINER,
      (req:Request,res:Response,next:NextFunction)=>{
        injectTrainerManagementController.blockTrainer(req,res,next);
      }
    );
    this._route.put(
      GYMADMIN.UNBLOCK_TRAINER,
      (req:Request,res:Response,next:NextFunction)=>{
        injectTrainerManagementController.unBlockTrainer(req,res,next);
      }
    );
    this._route.get(
      GYMADMIN.FIND_TRAINER,
      (req:Request,res:Response,next:NextFunction)=>{
        injectTrainerManagementController.findTrainer(req,res,next);
      }
    );
    this._route.post(
      GYMADMIN.UPDATE_TRAINER,
      (req:Request,res:Response,next:NextFunction)=>{
        injectTrainerManagementController.updateTrainer(req,res,next);
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
    this._route.get(
      GYMADMIN.LIST_ACTIVE_BRANCH,
      (req:Request,res:Response,next:NextFunction)=>{
        injectedBranchController.listActiveBranch(req,res,next);
      }
    )
    this._route.post(
      GYMADMIN.CREATE_MEMBER,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberManagementController.createMember(req, res, next);
      }
    );

    this._route.get(
      GYMADMIN.LISTMEMBER,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberManagementController.listMembers(req, res, next);
      }
    );

    this._route.get(
      GYMADMIN.FIND_MEMBER,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberManagementController.findMember(req, res, next);
      }
    );

    this._route.post(
      GYMADMIN.UPDATE_MEMBER,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberManagementController.updateMember(req, res, next);
      }
    );

    this._route.put(
      GYMADMIN.BLOCK_MEMBER,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberManagementController.blockMember(req, res, next);
      }
    );

    this._route.put(
      GYMADMIN.UNBLOCK_MEMBER,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberManagementController.unBlockMember(req, res, next);
      }
    )
    this._route.get(
      GYMADMIN.VIEW_PROFILE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedGymAdminProfileControler.viewProfile(req, res, next);
      }
    )
    this._route.post(
      GYMADMIN.UPDATE_PROFILE,
      upload.single("logo"),
      (req: Request, res: Response, next: NextFunction) => {
        injectedGymAdminProfileControler.updateProfile(req, res, next);
      }
    )
    this._route.post(
      GYMADMIN.CHANGE_PASSWORD,
      (req: Request, res: Response, next: NextFunction) => {
        injectedGymAdminProfileControler.changePassword(req, res, next);
      }
    )
  }

  public get_routes(): Router {
    return this._route;
  }
}
