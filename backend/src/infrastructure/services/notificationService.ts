import { Roles } from "../../domain/enums/roles";
import { NotificationType } from "../../domain/enums/notificationTypes";
import { ICreateNotificationUseCase } from "../../application/interfaces/useCase/shared/notificationManagement/createNotificationUseCaseInterface";
import { INotificationService } from "../../application/interfaces/service/notificationServiceInterface";

export interface INotificationPayload {
  receiverId: string;
  receiverRole: Roles;
  title: string;
  message: string;
  type: NotificationType;
  actionLink?: string;
  relatedId?: string;
  relatedModel?: string;
}

export class NotificationService implements INotificationService {
  constructor(private _createNotificationUseCase: ICreateNotificationUseCase) {}

  async notify(notification: INotificationPayload): Promise<void> {
    await this._createNotificationUseCase.execute({
      ...notification,
    });
  }

  async notifyMany(notifications: INotificationPayload[]): Promise<void> {
    await Promise.all(
      notifications.map((notification) =>
        this._createNotificationUseCase.execute({
          ...notification,
        }),
      ),
    );
  }
}
