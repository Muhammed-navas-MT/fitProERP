import { MarkAllNotificationsAsReadDto } from "../../../dtos/shared/notificationDto";
import { INotificationRepository } from "../../../interfaces/repository/shared/notificationRepositoryInterface";
import { IMarkAllNotificationsAsReadUseCase } from "../../../interfaces/useCase/shared/notificationManagement/markAllNotificationReadUseCaseInterface";

export class MarkAllNotificationsAsReadUseCase implements IMarkAllNotificationsAsReadUseCase {
  constructor(private _notificationRepository: INotificationRepository) {}

  async execute(data: MarkAllNotificationsAsReadDto): Promise<void> {
    await this._notificationRepository.markAllAsRead(data.userId);
  }
}
