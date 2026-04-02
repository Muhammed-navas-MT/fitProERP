import { Document, model, Model } from "mongoose";
import { messageSchema } from "../schemas/messageSchema";
import { MessageStatus } from "../../../../domain/enums/messageStatus";
import { MessageType } from "../../../../domain/enums/messageType";
import { ChatUserModel } from "../../../../domain/enums/chatUserModel";

export interface IMessageModel extends Document {
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
  seenAt?: Date;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const messageModel: Model<IMessageModel> = model<IMessageModel>(
  "Message",
  messageSchema,
);
