import { ListNotificationsDto } from "../../../dtos/shared/notificationDto";
import { INotificationRepository } from "../../../interfaces/repository/shared/notificationRepositoryInterface";
import { IListNotificationsUseCase } from "../../../interfaces/useCase/shared/notificationManagement/listNotificationUseCaseInterface";
import { NotificationMapper } from "../../../mappers/notificationMapper";

export class ListNotificationsUseCase implements IListNotificationsUseCase {
  constructor(private _notificationRepository: INotificationRepository) {}

  async execute(
    userId: string,
    page: number,
    limit: number,
  ): Promise<ListNotificationsDto> {
    const currentPage = Math.max(1, page);
    const currentLimit = Math.max(1, limit);

    const { notifications, total } =
      await this._notificationRepository.findByReceiverId(
        userId,
        currentPage,
        currentLimit,
      );

    const unreadCount = await this._notificationRepository.countUnread(userId);

    return {
      notifications: notifications.map((item) =>
        NotificationMapper.toResponse(item),
      ),
      total,
      page: currentPage,
      limit: currentLimit,
      totalPages: Math.ceil(total / currentLimit),
      unreadCount,
    };
  }
}
