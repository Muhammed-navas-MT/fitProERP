import { MessageType } from "../../enums/messageType";

export interface ConversationEntity {
  _id?: string;
  members: string[];
  participants: {
    userId: string;
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
