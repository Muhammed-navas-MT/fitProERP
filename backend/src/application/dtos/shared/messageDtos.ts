import { MessageType } from "../../../domain/enums/messageType";

export interface CreateMessageDto {
  conversationId: string;
  senderId: string;
  receiverId: string;
  text?: string;
  imageUrl?: string;
  type: MessageType;
}

export interface ListMessagesDto {
  conversationId: string;
  page: number;
  limit: number;
}
