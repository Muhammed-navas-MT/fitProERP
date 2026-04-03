import { NotificationEntity } from "../../../../domain/entities/shared/notificationEntity";
import { IBaseRepository } from "../base/baseRepo";

export interface INotificationRepository extends IBaseRepository<NotificationEntity> {
  createNotification(data: NotificationEntity): Promise<NotificationEntity>;
  findByReceiverId(
    receiverId: string,
    page: number,
    limit: number,
  ): Promise<{ notifications: NotificationEntity[]; total: number }>;
  markAsRead(notificationId: string): Promise<NotificationEntity | null>;
  markAllAsRead(receiverId: string): Promise<void>;
  countUnread(receiverId: string): Promise<number>;
}
