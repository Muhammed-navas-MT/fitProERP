import {
  MarkNotificationAsReadDto,
  NotificationResponseDto,
} from "../../../dtos/shared/notificationDto";
import { INotificationRepository } from "../../../interfaces/repository/shared/notificationRepositoryInterface";
import { IMarkNotificationAsReadUseCase } from "../../../interfaces/useCase/shared/notificationManagement/markNotificationReadUseCaseInterface";
import { NotificationMapper } from "../../../mappers/notificationMapper";

export class MarkNotificationAsReadUseCase implements IMarkNotificationAsReadUseCase {
  constructor(private _notificationRepository: INotificationRepository) {}

  async execute(
    data: MarkNotificationAsReadDto,
  ): Promise<NotificationResponseDto> {
    const notification = await this._notificationRepository.findById(
      data.notificationId,
    );

    if (!notification) {
      throw new Error("Notification not found");
    }

    if (notification.receiverId.toString() !== data.userId) {
      throw new Error("You are not allowed to update this notification");
    }

    const updated = await this._notificationRepository.markAsRead(
      data.notificationId,
    );

    if (!updated) {
      throw new Error("Failed to mark notification as read");
    }

    return NotificationMapper.toResponse(updated);
  }
}
