import { ChatUserModel } from "../../enums/chatUserModel";
import { MessageStatus } from "../../enums/messageStatus";
import { MessageType } from "../../enums/messageType";

export interface MessageEntity {
  _id?: string;
  conversationId: string;
  senderId: string;
  senderModel: ChatUserModel;
  receiverId: string;
  receiverModel: ChatUserModel;
  text?: string;
  imageUrl?: string;
  type: MessageType;
  status: MessageStatus;
  seenAt?: Date;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
