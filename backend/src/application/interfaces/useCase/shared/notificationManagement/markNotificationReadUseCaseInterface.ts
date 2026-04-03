import {
  MarkNotificationAsReadDto,
  NotificationResponseDto,
} from "../../../../dtos/shared/notificationDto";

export interface IMarkNotificationAsReadUseCase {
  execute(data: MarkNotificationAsReadDto): Promise<NotificationResponseDto>;
}
