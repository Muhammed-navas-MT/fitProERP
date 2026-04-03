import { MessageEntity } from "../../../domain/entities/shared/messageEntity";
import { NotificationEntity } from "../../../domain/entities/shared/notificationEntity";

export interface ISocketService {
  emitReceiveMessage(
    conversationId: string,
    receiverId: string,
    message: MessageEntity,
  ): void;

  emitConversationUpdated(
    receiverId: string,
    payload: {
      conversationId: string;
      lastMessage?: string;
      lastMessageType: string;
      lastMessageAt: string;
      senderId: string;
    },
  ): void;

  emitConversationSeen(
    senderId: string,
    payload: {
      conversationId: string;
      seenBy: string;
    },
  ): void;
  emitNotification(receiverId: string, notification: NotificationEntity): void;
}
