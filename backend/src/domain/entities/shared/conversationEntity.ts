import { ChatUserModel } from "../../enums/chatUserModel";
import { MessageType } from "../../enums/messageType";

export interface ConversationEntity {
  _id?: string;
  conversationKey: string;
  members: {
    userId: string;
    userModel: ChatUserModel;
  }[];
  participants: {
    userId: string;
    userModel: ChatUserModel;
    isOnline: boolean;
    lastSeen?: Date;
  }[];
  lastMessageId?: string;
  lastMessage?: string;
  lastMessageType?: MessageType;
  lastMessageAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
