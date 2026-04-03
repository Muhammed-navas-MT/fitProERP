import { Roles } from "../../../domain/enums/roles";
import { NotificationType } from "../../../domain/enums/notificationTypes";

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

export interface INotificationService {
  notify(notification: INotificationPayload): Promise<void>;
  notifyMany(notifications: INotificationPayload[]): Promise<void>;
}
