import { MessageEntity } from "../../../domain/entities/shared/messageEntity";

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
}
