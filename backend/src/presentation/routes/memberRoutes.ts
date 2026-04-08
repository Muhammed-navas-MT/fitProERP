import { NextFunction, Request, Response, Router } from "express";
import { ROUTES } from "../shared/constants/routes";
import {
  injectedCheckMemberAccessMiddleWare,
  injectedDashboardController,
  injectedDietPlanController,
  injectedForgetPasswordMemberController,
  injectedMemberLoginController,
  injectedMemberLogoutController,
  injectedMemberProfileController,
  injectedPackageListAndCheckoutController,
  injectedProgressController,
  injectedSlotAndBookingController,
  injectedtrainerController,
  injectedWorkoutPlanController,
} from "../../infrastructure/DI/member/memberInjection";
import { injectAuthMiddleware } from "../../infrastructure/DI/gymAdmin/gymAdminInjection";
import { upload } from "../middlewares/multer";
import { injectedAttendanceController } from "../../infrastructure/DI/shared/attendanceInjection";
import { injectedChatController } from "../../infrastructure/DI/shared/chatInjection";
import { injectedNotificationController } from "../../infrastructure/DI/shared/notificationInjection";
import { SubdomainMiddleware } from "../middlewares/subdomainMiddleware";

export class MemberRoutes {
  private _route: Router;
  private _middleware: SubdomainMiddleware;
  constructor() {
    this._middleware = new SubdomainMiddleware();
    this._route = Router();
    this._setRoute();
  }

  private _setRoute() {
    this._route.post(
      ROUTES.MEMBER.LOGIN,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberLoginController.login(req, res, next);
      },
    );
    this._route.post(
      ROUTES.MEMBER.LOGOUT,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberLogoutController.logout(req, res, next);
      },
    );

    this._route.use(this._middleware.verifySubdomain);

    this._route.post(
      ROUTES.MEMBER.VERIFY_EMAIL,
      (req: Request, res: Response, next: NextFunction) => {
        injectedForgetPasswordMemberController.handleVerifyEmail(
          req,
          res,
          next,
        );
      },
    );
    this._route.post(
      ROUTES.MEMBER.VERIFY_OTP,
      (req: Request, res: Response, next: NextFunction) => {
        injectedForgetPasswordMemberController.handleVerifyOtp(req, res, next);
      },
    );
    this._route.post(
      ROUTES.MEMBER.NEW_PASSWORD,
      (req: Request, res: Response, next: NextFunction) => {
        injectedForgetPasswordMemberController.handleNewPassword(
          req,
          res,
          next,
        );
      },
    );

    this._route.use(injectAuthMiddleware.verify);

    this._route.get(
      ROUTES.MEMBER.LIST_ACTIVE_PACKAGES,
      (req: Request, res: Response, next: NextFunction) => {
        injectedPackageListAndCheckoutController.listPackages(req, res, next);
      },
    );

    this._route.post(
      ROUTES.MEMBER.CHECKOUT,
      (req: Request, res: Response, next: NextFunction) => {
        injectedPackageListAndCheckoutController.handleCheckout(req, res, next);
      },
    );
    this._route.use(injectedCheckMemberAccessMiddleWare.execute);

    this._route.get(
      ROUTES.MEMBER.VIEW_PROFILE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberProfileController.viewMemberProfile(req, res, next);
      },
    );
    this._route.post(
      ROUTES.MEMBER.UPDATE_PROFILE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberProfileController.updateProfile(req, res, next);
      },
    );
    this._route.post(
      ROUTES.MEMBER.UPLOAD_PROFILE_PICTURE,
      upload.single("profileImg"),
      (req, res, next) => {
        injectedMemberProfileController.uploadProfilePicture(req, res, next);
      },
    );
    this._route.put(
      ROUTES.MEMBER.DELETE_PROFILE_PICTURE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberProfileController.deleteProfilePicture(req, res, next);
      },
    );
    this._route.post(
      ROUTES.MEMBER.CHANGE_PASSWORD,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberProfileController.changePassword(req, res, next);
      },
    );

    this._route.post(
      ROUTES.MEMBER.MARK_ATTENDANCE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedAttendanceController.markAttendance(req, res, next);
      },
    );

    this._route.post(
      ROUTES.MEMBER.CHECK_OUT_ATTENDANCE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedAttendanceController.updateAttendance(req, res, next);
      },
    );

    this._route.get(
      ROUTES.MEMBER.GET_ATTENDANCE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedAttendanceController.getAttendance(req, res, next);
      },
    );

    this._route.get(
      ROUTES.MEMBER.GET_ALL_ATTENDANCE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedAttendanceController.getAttendanceList(req, res, next);
      },
    );

    this._route.get(
      ROUTES.MEMBER.GET_CURRENT_MONTH_ATTENDANCE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedAttendanceController.getCurrentMonthAttendance(req, res, next);
      },
    );

    this._route.get(
      ROUTES.MEMBER.LIST_PAYMENTS,
      (req: Request, res: Response, next: NextFunction) => {
        injectedPackageListAndCheckoutController.listAllPayments(
          req,
          res,
          next,
        );
      },
    );
    this._route.post(
      ROUTES.MEMBER.CREATE_WORKOUT,
      (req: Request, res: Response, next: NextFunction) => {
        injectedWorkoutPlanController.handleCreateWorkoutPlan(req, res, next);
      },
    );
    this._route.get(
      ROUTES.MEMBER.LIST_WORKOUT,
      (req: Request, res: Response, next: NextFunction) => {
        injectedWorkoutPlanController.handleListWorkoutPlan(req, res, next);
      },
    );
    this._route.post(
      ROUTES.MEMBER.CREATE_DIET,
      (req: Request, res: Response, next: NextFunction) => {
        injectedDietPlanController.handleCreateDietPlan(req, res, next);
      },
    );
    this._route.get(
      ROUTES.MEMBER.LIST_DIET,
      (req: Request, res: Response, next: NextFunction) => {
        injectedDietPlanController.handleListDietPlan(req, res, next);
      },
    );
    this._route.get(
      ROUTES.MEMBER.LIST_AVAILABLE_SLOT,
      (req: Request, res: Response, next: NextFunction) => {
        injectedSlotAndBookingController.handleListAvailableSlot(
          req,
          res,
          next,
        );
      },
    );
    this._route.post(
      ROUTES.MEMBER.CHECKOUT_SESSION,
      (req: Request, res: Response, next: NextFunction) => {
        injectedSlotAndBookingController.handleCheckout(req, res, next);
      },
    );

    this._route.get(
      ROUTES.MEMBER.LIST_SESSIONS,
      (req: Request, res: Response, next: NextFunction) => {
        injectedSlotAndBookingController.handleListAllSession(req, res, next);
      },
    );

    this._route.get(
      ROUTES.MEMBER.LIST_ACTIVE_TRAINERS,
      (req: Request, res: Response, next: NextFunction) => {
        injectedtrainerController.listActiveTrainers(req, res, next);
      },
    );

    this._route.put(
      ROUTES.MEMBER.CANCEL_SESSION,
      (req: Request, res: Response, next: NextFunction) => {
        injectedSlotAndBookingController.handleCancelSession(req, res, next);
      },
    );
    this._route.post(
      ROUTES.MEMBER.CREATE_PROGRESS,
      (req: Request, res: Response, next: NextFunction) => {
        injectedProgressController.handleCreateProgress(req, res, next);
      },
    );
    this._route.get(
      ROUTES.MEMBER.FIND_PROGRESS,
      (req: Request, res: Response, next: NextFunction) => {
        injectedProgressController.handleFindProgress(req, res, next);
      },
    );
    this._route.get(
      ROUTES.MEMBER.LIST_PROGRESS,
      (req: Request, res: Response, next: NextFunction) => {
        injectedProgressController.handleListProgress(req, res, next);
      },
    );
    this._route.put(
      ROUTES.MEMBER.UPDATE_PROGRESS,
      (req: Request, res: Response, next: NextFunction) => {
        injectedProgressController.handleUpdateProgress(req, res, next);
      },
    );
    this._route.get(
      ROUTES.MEMBER.FIND_PROGRESS_GRAPH_DATA,
      (req: Request, res: Response, next: NextFunction) => {
        injectedProgressController.handleGetProgressGraphData(req, res, next);
      },
    );
    this._route.post(
      ROUTES.MEMBER.CONVERSATION,
      (req: Request, res: Response, next: NextFunction) => {
        injectedChatController.createConversation(req, res, next);
      },
    );
    this._route.get(
      ROUTES.MEMBER.CONVERSATIONS,
      (req: Request, res: Response, next: NextFunction) => {
        injectedChatController.listConversations(req, res, next);
      },
    );
    this._route.post(
      ROUTES.MEMBER.MESSAGE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedChatController.sendMessage(req, res, next);
      },
    );
    this._route.get(
      ROUTES.MEMBER.LIST_MESSAGES,
      (req: Request, res: Response, next: NextFunction) => {
        injectedChatController.listMessages(req, res, next);
      },
    );
    this._route.patch(
      ROUTES.MEMBER.SEEN_CONVERSATION,
      (req: Request, res: Response, next: NextFunction) => {
        injectedChatController.markMessageSeen(req, res, next);
      },
    );
    this._route.get(
      ROUTES.MEMBER.FIND_ASSIGNED_TRAINER,
      (req: Request, res: Response, next: NextFunction) => {
        injectedtrainerController.findAssignedTrainers(req, res, next);
      },
    );
    this._route.get(
      ROUTES.MEMBER.LIST_NOTIFICATION,
      (req: Request, res: Response, next: NextFunction) => {
        injectedNotificationController.handleListNotification(req, res, next);
      },
    );
    this._route.patch(
      ROUTES.MEMBER.MARK_ALL_NOTIFICATION,
      (req: Request, res: Response, next: NextFunction) => {
        injectedNotificationController.handleMarkAllNotificationsAsRead(
          req,
          res,
          next,
        );
      },
    );
    this._route.patch(
      ROUTES.MEMBER.MARK_NOTIFICATION,
      (req: Request, res: Response, next: NextFunction) => {
        injectedNotificationController.handleMarkNotificationAsRead(
          req,
          res,
          next,
        );
      },
    );
    this._route.get(
      ROUTES.MEMBER.GET_DASHBOARD_DETAILS,
      (req: Request, res: Response, next: NextFunction) => {
        injectedDashboardController.handleDashboard(req, res, next);
      },
    );
  }
  public get_routes(): Router {
    return this._route;
  }
}
