import { MessageEntity } from "../../../domain/entities/shared/messageEntity";

export interface ISocketService {
  emitReceiveMessage(receiverId: string, message: MessageEntity): void;
  emitMessageSeen(senderId: string, messageId: string): void;
}
