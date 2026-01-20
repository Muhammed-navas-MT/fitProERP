import { NextFunction, Request, Response, Router } from "express";
import { ROUTES } from "../shared/constants/routes";
import {
  injectedCheckMemberAccessMiddleWare,
  injectedMemberLoginController,
  injectedMemberLogoutController,
  injectedMemberProfileController,
  injectedPackageListAndCheckoutController,
} from "../../infrastructure/DI/member/memberInjection";
import { injectAuthMiddleware } from "../../infrastructure/DI/gymAdmin/gymAdminInjection";
import { upload } from "../middlewares/multer";
import { injectedAttendanceController } from "../../infrastructure/DI/shared/attendanceInjection";

export class MemberRoutes {
  private _route: Router;
  constructor() {
    this._route = Router();
    this._setRoute();
  }

  private _setRoute() {
    this._route.post(
      ROUTES.MEMBER.LOGIN,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberLoginController.login(req, res, next);
      }
    );
    this._route.post(
      ROUTES.MEMBER.LOGOUT,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberLogoutController.logout(req, res, next);
      }
    );
    
    this._route.use(injectAuthMiddleware.verify);

    this._route.get(
      ROUTES.MEMBER.LIST_ACTIVE_PACKAGES,
      (req:Request,res:Response,next:NextFunction) =>{
        injectedPackageListAndCheckoutController.listPackages(req,res,next);
      }
    );

    this._route.post(
      ROUTES.MEMBER.CHECKOUT,
      (req:Request,res:Response,next:NextFunction)=>{
        injectedPackageListAndCheckoutController.handleCheckout(req,res,next);
      }
    )
    this._route.use(injectedCheckMemberAccessMiddleWare.execute);

    this._route.get(
      ROUTES.MEMBER.VIEW_PROFILE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberProfileController.viewMemberProfile(req, res, next);
      }
    );
    this._route.post(
      ROUTES.MEMBER.UPDATE_PROFILE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberProfileController.updateProfile(req, res, next);
      }
    );
    this._route.post(
      ROUTES.MEMBER.UPLOAD_PROFILE_PICTURE,
      upload.single("profileImg"),
      (req, res, next) => {
        injectedMemberProfileController.uploadProfilePicture(req, res, next);
      }
    );
    this._route.put(
      ROUTES.MEMBER.DELETE_PROFILE_PICTURE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberProfileController.deleteProfilePicture(req, res, next);
      }
    );
    this._route.post(
      ROUTES.MEMBER.CHANGE_PASSWORD,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberProfileController.changePassword(req, res, next);
      }
    );

    this._route.post(
      ROUTES.MEMBER.MARK_ATTENDANCE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedAttendanceController.markAttendance(req, res, next);
      }
    );

    this._route.post(
      ROUTES.MEMBER.CHECK_OUT_ATTENDANCE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedAttendanceController.updateAttendance(req, res, next);
      }
    );

    this._route.get(
      ROUTES.MEMBER.GET_ATTENDANCE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedAttendanceController.getAttendance(req, res, next);
      }
    );

    this._route.get(
      ROUTES.MEMBER.GET_ALL_ATTENDANCE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedAttendanceController.getAttendanceList(req, res, next);
      }
    );

    this._route.get(
      ROUTES.MEMBER.GET_CURRENT_MONTH_ATTENDANCE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedAttendanceController.getCurrentMonthAttendance(req, res, next);
      }
    );
  }
  public get_routes(): Router {
    return this._route;
  }
}
