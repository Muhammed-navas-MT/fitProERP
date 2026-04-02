import { ChatUserModel } from "../../../domain/enums/chatUserModel";
import { MessageType } from "../../../domain/enums/messageType";

export interface CreateMessageDto {
  conversationId: string;
  senderId: string;
  senderModel: ChatUserModel;
  receiverId: string;
  receiverModel: ChatUserModel;
  text?: string;
  imageUrl?: string;
  type: MessageType;
}

export interface ListMessagesDto {
  conversationId: string;
  page: number;
  limit: number;
}

export interface CreateConversationDto {
  firstUserId: string;
  firstUserModel: ChatUserModel;
  secondUserId: string;
  secondUserModel: ChatUserModel;
}

export interface ListConversationsDto {
  userId: string;
  userModel: ChatUserModel;
  page?: number;
  limit?: number;
}

export interface ListConverSationsResponseDto {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  conversations: {
    _id: string;
    conversationKey: string;
    members: {
      userId: string;
      userModel: ChatUserModel;
      name: string;
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
  }[];
}

export interface MarkConversationSeenDto {
  conversationId: string;
  viewerId: string;
}
