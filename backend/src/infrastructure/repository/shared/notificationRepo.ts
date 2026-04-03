import { Model } from "mongoose";
import { INotificationRepository } from "../../../application/interfaces/repository/shared/notificationRepositoryInterface";
import { BaseRepository } from "../base/baseRepo";
import { INotificationModel } from "../databaseConfigs/models/notificationModel";
import { NotificationEntity } from "../../../domain/entities/shared/notificationEntity";

export class NotificationRepository
  extends BaseRepository<INotificationModel>
  implements INotificationRepository
{
  constructor(model: Model<INotificationModel>) {
    super(model);
  }

  async createNotification(
    data: NotificationEntity,
  ): Promise<NotificationEntity> {
    const notification = await this._model.create(data);

    return this.toEntity(notification);
  }

  async findByReceiverId(
    receiverId: string,
    page: number,
    limit: number,
  ): Promise<{ notifications: NotificationEntity[]; total: number }> {
    const skip = (page - 1) * limit;

    const [notifications, total] = await Promise.all([
      this._model
        .find({ receiverId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean<INotificationModel[]>(),
      this._model.countDocuments({ receiverId }),
    ]);

    return {
      notifications: notifications.map((item) => this.toEntity(item)),
      total,
    };
  }

  async markAsRead(notificationId: string): Promise<NotificationEntity | null> {
    const updatedNotification = await this._model
      .findByIdAndUpdate(
        notificationId,
        { $set: { isRead: true } },
        { new: true },
      )
      .lean<INotificationModel | null>();

    if (!updatedNotification) return null;

    return this.toEntity(updatedNotification);
  }

  async markAllAsRead(receiverId: string): Promise<void> {
    await this._model.updateMany(
      { receiverId, isRead: false },
      { $set: { isRead: true } },
    );
  }

  async countUnread(receiverId: string): Promise<number> {
    return await this._model.countDocuments({
      receiverId,
      isRead: false,
    });
  }

  async delete(notificationId: string): Promise<void> {
    await this._model.findByIdAndDelete(notificationId);
  }

  private toEntity(notification: INotificationModel): NotificationEntity {
    return {
      _id: notification._id?.toString(),
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
