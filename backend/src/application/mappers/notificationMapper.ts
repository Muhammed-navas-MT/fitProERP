import { NotificationEntity } from "../../domain/entities/shared/notificationEntity";
import { NotificationResponseDto } from "../dtos/shared/notificationDto";

export class NotificationMapper {
  static toResponse(notification: NotificationEntity): NotificationResponseDto {
    return {
      id: notification._id!,
      receiverId: notification.receiverId,
      receiverRole: notification.receiverRole,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      isRead: notification.isRead,
      actionLink: notification.actionLink,
      relatedId: notification.relatedId,
      relatedModel: notification.relatedModel,
      createdAt: notification.createdAt,
      updatedAt: notification.updatedAt,
    };
  }
}
