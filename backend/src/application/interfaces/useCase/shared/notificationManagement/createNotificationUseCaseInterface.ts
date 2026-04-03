import {
  CreateNotificationDto,
  NotificationResponseDto,
} from "../../../../dtos/shared/notificationDto";

export interface ICreateNotificationUseCase {
  execute(data: CreateNotificationDto): Promise<NotificationResponseDto>;
}
