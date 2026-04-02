import { ChatUserModel } from "../../../../domain/enums/chatUserModel";
import { MessageType } from "../../../../domain/enums/messageType";

export interface IPopulatedConversation {
  _id?: string;
  conversationKey: string;
  members: {
    userId: {
      _id: string;
      name: string;
    };
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
