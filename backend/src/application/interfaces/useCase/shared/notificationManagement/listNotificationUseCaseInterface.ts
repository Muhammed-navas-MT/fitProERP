import { ListNotificationsDto } from "../../../../dtos/shared/notificationDto";

export interface IListNotificationsUseCase {
  execute(
    userId: string,
    page: number,
    limit: number,
  ): Promise<ListNotificationsDto>;
}
