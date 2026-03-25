import { ROUTES } from "../shared/constants/routes";
import { Request, Response, NextFunction, Router } from "express";
import {
  injectedCheckAccessTrainerMiddleware,
  injectedLeaveController,
  injectedMemberController,
  injectedProfileController,
  injectedSessionController,
  injectedSlotRuleController,
  injectedTrainerLoginController,
  injectedTrainerLogoutController,
} from "../../infrastructure/DI/trainer/trainerInjection";
import { injectAuthMiddleware } from "../../infrastructure/DI/gymAdmin/gymAdminInjection";
import { injectedAttendanceController } from "../../infrastructure/DI/shared/attendanceInjection";
export class TrainerRoutes {
  private _route: Router;
  constructor() {
    this._route = Router();
    this._setRoute();
  }

  private _setRoute() {
    const TRAINER = ROUTES.TRAINER;
    this._route.post(
      TRAINER.AUTH.LOGIN,
      (req: Request, res: Response, next: NextFunction) => {
        injectedTrainerLoginController.login(req, res, next);
      },
    );

    this._route.post(
      TRAINER.AUTH.LOGOUT,
      (req: Request, res: Response, next: NextFunction) => {
        injectedTrainerLogoutController.trainerLogout(req, res, next);
      },
    );

    this._route.use([
      injectAuthMiddleware.verify,
      injectedCheckAccessTrainerMiddleware.execute,
    ]);

    this._route.post(
      TRAINER.ADD_MEMBER,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberController.createMember(req, res, next);
      },
    );

    this._route.get(
      TRAINER.LIST_MEMBER,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberController.listAllMembers(req, res, next);
      },
    );

    this._route.get(
      TRAINER.FIND_MEMBER,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberController.findMember(req, res, next);
      },
    );

    this._route.put(
      TRAINER.UNBLOCK_MEMBER,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberController.unBlockMember(req, res, next);
      },
    );

    this._route.put(
      TRAINER.BLOCK_MEMBER,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberController.blockMember(req, res, next);
      },
    );

    this._route.post(
      TRAINER.UPDATE_MEMBER,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberController.updateMember(req, res, next);
      },
    );

    this._route.get(
      TRAINER.LIST_ACTIVE_TRAINER,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberController.listAllActiveTrainers(req, res, next);
      },
    );

    this._route.get(
      TRAINER.LIST_ACTIVE_BRANCH,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberController.listAllActiveBranches(req, res, next);
      },
    );

    this._route.get(
      TRAINER.LIST_ACTIVE_TRAINER_BRANCH,
      (req: Request, res: Response, next: NextFunction) => {
        injectedMemberController.listActiveTrainersByBranchId(req, res, next);
      },
    );

    this._route.get(
      TRAINER.VIEW_PROFILE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedProfileController.viewProfile(req, res, next);
      },
    );

    this._route.post(
      TRAINER.CHANGE_PASSWORD,
      (req: Request, res: Response, next: NextFunction) => {
        injectedProfileController.changePassword(req, res, next);
      },
    );

    this._route.post(
      TRAINER.UPDATE_PROFILE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedProfileController.updateProfile(req, res, next);
      },
    );

    this._route.post(
      TRAINER.MARK_ATTENDANCE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedAttendanceController.markAttendance(req, res, next);
      },
    );

    this._route.post(
      TRAINER.CHECK_OUT_ATTENDANCE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedAttendanceController.updateAttendance(req, res, next);
      },
    );

    this._route.get(
      TRAINER.GET_ATTENDANCE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedAttendanceController.getAttendance(req, res, next);
      },
    );

    this._route.get(
      TRAINER.GET_ALL_ATTENDANCE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedAttendanceController.getAttendanceList(req, res, next);
      },
    );

    this._route.get(
      TRAINER.GET_CURRENT_MONTH_ATTENDANCE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedAttendanceController.getCurrentMonthAttendance(req, res, next);
      },
    );

    this._route.post(
      TRAINER.CREATE_LEAVE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedLeaveController.handleCreateLeave(req, res, next);
      },
    );

    this._route.get(
      TRAINER.FIND_LEAVE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedLeaveController.handleFindLeave(req, res, next);
      },
    );

    this._route.post(
      TRAINER.UPDATE_LEAVE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedLeaveController.handleUpdateLeave(req, res, next);
      },
    );

    this._route.get(
      TRAINER.LIST_LEAVE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedLeaveController.handleListLeave(req, res, next);
      },
    );

    this._route.post(
      TRAINER.CREATE_SLOT_RULE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedSlotRuleController.handleCreateslotRule(req, res, next);
      },
    );

    this._route.get(
      TRAINER.FIND_SLOT_RULE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedSlotRuleController.handleFindSlotRule(req, res, next);
      },
    );

    this._route.post(
      TRAINER.UPDATE_SLOT_RULE,
      (req: Request, res: Response, next: NextFunction) => {
        injectedSlotRuleController.handleUpdateSlotRule(req, res, next);
      },
    );

    this._route.get(
      TRAINER.LIST_SESSION,
      (req: Request, res: Response, next: NextFunction) => {
        injectedSessionController.handleListSession(req, res, next);
      },
    );

    this._route.get(
      TRAINER.LIST_SLOTS,
      (req: Request, res: Response, next: NextFunction) => {
        injectedSlotRuleController.handleListSlot(req, res, next);
      },
    );
  }

  public get_routes(): Router {
    return this._route;
  }
}
