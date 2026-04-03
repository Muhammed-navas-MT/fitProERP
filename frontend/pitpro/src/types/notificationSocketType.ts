export interface NotificationSocketEvent {
  _id?: string;
  id?: string;
  receiverId: string;
  receiverRole: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  actionLink?: string;
  relatedId?: string;
  relatedModel?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
