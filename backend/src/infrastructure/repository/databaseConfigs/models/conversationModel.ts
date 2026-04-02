import { Document, model, Model } from "mongoose";
import { conversationSchema } from "../schemas/conversationSchema";
import { MessageType } from "../../../../domain/enums/messageType";
import { ChatUserModel } from "../../../../domain/enums/chatUserModel";

export interface IConversationModel extends Document {
  _id: string;
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

  createdAt: Date;
  updatedAt: Date;
}

export const conversationModel: Model<IConversationModel> =
  model<IConversationModel>("Conversation", conversationSchema);
