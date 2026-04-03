import { Document, model } from "mongoose";
import { notificationSchema } from "../schemas/notificationSchema";
import { Roles } from "../../../../domain/enums/roles";
import { NotificationType } from "../../../../domain/enums/notificationTypes";

export interface INotificationModel extends Document {
  _id: string;
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

export const notificationModel = model<INotificationModel>(
  "Notification",
  notificationSchema,
);
