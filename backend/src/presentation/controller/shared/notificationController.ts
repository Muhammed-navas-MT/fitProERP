import { NextFunction, Request, Response } from "express";
import { IListNotificationsUseCase } from "../../../application/interfaces/useCase/shared/notificationManagement/listNotificationUseCaseInterface";
import { IMarkAllNotificationsAsReadUseCase } from "../../../application/interfaces/useCase/shared/notificationManagement/markAllNotificationReadUseCaseInterface";
import { IMarkNotificationAsReadUseCase } from "../../../application/interfaces/useCase/shared/notificationManagement/markNotificationReadUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";

export class NotificationController {
  constructor(
    private _listNotificationsUseCase: IListNotificationsUseCase,
    private _markNotificationasReadUseCase: IMarkNotificationAsReadUseCase,
    private _markAllNotificationAsReadUseCase: IMarkAllNotificationsAsReadUseCase,
  ) {}
  async handleListNotification(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = res.locals.data.id;
      const page = Math.max(1, Number(req.query.page) || 1);
      const limit = Math.max(1, Number(req.query.limit) || 6);

      const notification = await this._listNotificationsUseCase.execute(
        userId,
        page,
        limit,
      );
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "List all notifications",
        notification,
      );
    } catch (error) {
      next(error);
    }
  }

  async handleMarkNotificationAsRead(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { notificationId } = req.params;
      const userId = res.locals.data.id;
      const notification = await this._markNotificationasReadUseCase.execute({
        userId,
        notificationId,
      });

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Notification marked as read successfully",
        notification,
      );
    } catch (error) {
      next(error);
    }
  }

  async handleMarkAllNotificationsAsRead(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = res.locals.data.id;
      await this._markAllNotificationAsReadUseCase.execute({ userId });
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "All notifications marked as read successfully",
      );
    } catch (error) {
      next(error);
    }
  }
}
