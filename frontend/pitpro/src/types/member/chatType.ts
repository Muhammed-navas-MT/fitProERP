export interface CreateConversationPayload {
  secondUserId: string;
  secondUserModel: "Trainer" | "Member";
}

export interface CreateConversationResponse {
  _id: string;
  members: {
    userId: string;
    userModel: string;
  }[];
  participants: {
    userId: string;
    userModel: ChatUserModel;
    isOnline?: boolean;
  }[];
  lastMessage?: string;
  lastMessageType?: MessageType;
  lastMessageAt?: string;
  unreadCount?: number;
}

export type ChatUserModel = "Member" | "Trainer";
export type MessageType = "TEXT" | "IMAGE" | "FILE";
export type MessageStatus = "SENT" | "DELIVERED" | "SEEN";

export interface ConversationParticipant {
  userId: string;
  userModel: ChatUserModel;
  isOnline?: boolean;
}

export interface ConversationItem {
  _id: string;
  conversationKey?: string;
  members: {
    userId: string;
    userModel: ChatUserModel;
    name: string;
  }[];
  participants: ConversationParticipant[];
  lastMessage?: string;
  lastMessageType?: MessageType;
  lastMessageAt?: string;
  unreadCount?: number;
}

export interface MessageItem {
  _id: string;
  conversationId: string;
  senderId: string;
  senderModel: ChatUserModel;
  receiverId: string;
  receiverModel: ChatUserModel;
  text?: string;
  imageUrl?: string;
  type: MessageType;
  status: MessageStatus;
  seenAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationSeenEvent {
  conversationId: string;
  seenBy: string;
}

export interface TypingEvent {
  conversationId: string;
  userId: string;
}

export interface ConversationUpdatedEvent {
  conversationId: string;
  lastMessage?: string;
  lastMessageType: string;
  lastMessageAt: string;
  senderId: string;
}

export const SECOND_USER_ID = "69a66c18aa56ad85849b7b54";
export const SECOND_USER_MODEL: ChatUserModel = "Trainer";

export const formatTime = (dateString?: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDateLabel = (dateString?: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString();
};

export interface SendMessagePayload {
  conversationId: string;
  receiverId: string;
  text?: string;
  imageUrl?: string;
  type: "TEXT" | "IMAGE";
}