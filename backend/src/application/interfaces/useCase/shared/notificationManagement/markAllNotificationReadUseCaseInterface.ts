import { MarkAllNotificationsAsReadDto } from "../../../../dtos/shared/notificationDto";

export interface IMarkAllNotificationsAsReadUseCase {
  execute(data: MarkAllNotificationsAsReadDto): Promise<void>;
}
