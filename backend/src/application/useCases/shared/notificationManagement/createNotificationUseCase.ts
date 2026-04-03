import { NotificationEntity } from "../../../../domain/entities/shared/notificationEntity";
import {
  CreateNotificationDto,
  NotificationResponseDto,
} from "../../../dtos/shared/notificationDto";
import { INotificationRepository } from "../../../interfaces/repository/shared/notificationRepositoryInterface";
import { ISocketService } from "../../../interfaces/service/socketServiceInterface";
import { ICreateNotificationUseCase } from "../../../interfaces/useCase/shared/notificationManagement/createNotificationUseCaseInterface";
import { NotificationMapper } from "../../../mappers/notificationMapper";

export class CreateNotificationUseCase implements ICreateNotificationUseCase {
  constructor(
    private _notificationRepository: INotificationRepository,
    private _socketService: ISocketService,
  ) {}

  async execute(data: CreateNotificationDto): Promise<NotificationResponseDto> {
    const notificationData: NotificationEntity = {
      receiverId: data.receiverId,
      receiverRole: data.receiverRole,
      title: data.title,
      message: data.message,
      type: data.type,
      isRead: false,
      actionLink: data.actionLink,
      relatedId: data.relatedId,
      relatedModel: data.relatedModel,
    };

    const notification =
      await this._notificationRepository.createNotification(notificationData);

    this._socketService.emitNotification(data.receiverId, notification);

    return NotificationMapper.toResponse(notification);
  }
}
