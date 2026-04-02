export type ChatUserModel = "Member" | "Trainer";
export type MessageType = "TEXT" | "IMAGE";
export type MessageStatus = "SENT" | "DELIVERED" | "SEEN";

export interface ReceiveMessageEvent {
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

export interface ConversationUpdatedEvent {
  conversationId: string;
  lastMessage?: string;
  lastMessageType: string;
  lastMessageAt: string;
  senderId: string;
}

export interface ConversationSeenEvent {
  conversationId: string;
  seenBy: string;
}

export interface TypingEvent {
  conversationId: string;
  userId: string;
}