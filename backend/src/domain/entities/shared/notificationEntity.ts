import { NotificationType } from "../../enums/notificationTypes";
import { Roles } from "../../enums/roles";

export interface NotificationEntity {
  _id?: string;
  receiverId: string;
  receiverRole: Roles;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  actionLink?: string;
  relatedId?: string;
  relatedModel?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
