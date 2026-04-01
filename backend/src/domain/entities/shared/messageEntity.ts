import { MessageStatus } from "../../enums/messageStatus";
import { MessageType } from "../../enums/messageType";

export interface MessageEntity {
  _id?: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  text?: string;
  imageUrl?: string;
  type: MessageType;
  status: MessageStatus;
  seenAt?: Date;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
