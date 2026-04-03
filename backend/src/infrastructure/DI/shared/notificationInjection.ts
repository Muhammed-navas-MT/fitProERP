import { ListNotificationsUseCase } from "../../../application/useCases/shared/notificationManagement/listNotificationsUseCase";
import { MarkAllNotificationsAsReadUseCase } from "../../../application/useCases/shared/notificationManagement/markAllNotificationsReadUseCase";
import { MarkNotificationAsReadUseCase } from "../../../application/useCases/shared/notificationManagement/markNotificationReadUseCase";
import { NotificationController } from "../../../presentation/controller/shared/notificationController";
import { notificationModel } from "../../repository/databaseConfigs/models/notificationModel";
import { NotificationRepository } from "../../repository/shared/notificationRepo";

const notificationRepository = new NotificationRepository(notificationModel);
const listNotificationUseCase = new ListNotificationsUseCase(
  notificationRepository,
);
const markAllNotificationReadUseCase = new MarkAllNotificationsAsReadUseCase(
  notificationRepository,
);
const markNotificationReadUseCase = new MarkNotificationAsReadUseCase(
  notificationRepository,
);
export const injectedNotificationController = new NotificationController(
  listNotificationUseCase,
  markNotificationReadUseCase,
  markAllNotificationReadUseCase,
);
