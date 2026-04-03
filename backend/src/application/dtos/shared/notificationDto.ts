import { NotificationType } from "../../../domain/enums/notificationTypes";
import { Roles } from "../../../domain/enums/roles";

export interface CreateNotificationDto {
  receiverId: string;
  receiverRole: Roles;
  title: string;
  message: string;
  type: NotificationType;
  actionLink?: string;
  relatedId?: string;
  relatedModel?: string;
}

export interface NotificationResponseDto {
  id: string;
  receiverId: string;
  receiverRole: Roles;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  actionLink?: string;
  relatedId?: string;
  relatedModel?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListNotificationsDto {
  notifications: NotificationResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  unreadCount: number;
}

export interface MarkNotificationAsReadDto {
  notificationId: string;
  userId: string;
}

export interface MarkAllNotificationsAsReadDto {
  userId: string;
}
