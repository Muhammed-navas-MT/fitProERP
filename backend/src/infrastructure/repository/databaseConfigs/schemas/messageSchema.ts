import { Schema } from "mongoose";
import { MessageStatus } from "../../../../domain/enums/messageStatus";
import { MessageType } from "../../../../domain/enums/messageType";
import { ChatUserModel } from "../../../../domain/enums/chatUserModel";

export const messageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },

    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "senderModel",
    },

    senderModel: {
      type: String,
      required: true,
      enum: Object.values(ChatUserModel),
    },

    receiverId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "receiverModel",
    },

    receiverModel: {
      type: String,
      required: true,
      enum: Object.values(ChatUserModel),
    },

    text: {
      type: String,
      trim: true,
    },

    imageUrl: {
      type: String,
      trim: true,
    },

    type: {
      type: String,
      enum: Object.values(MessageType),
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(MessageStatus),
      default: MessageStatus.SENT,
    },

    seenAt: {
      type: Date,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

messageSchema.index({ conversationId: 1, createdAt: -1 });

messageSchema.pre("validate", function (next) {
  if (!this.text && !this.imageUrl) {
    return next(new Error("Message must contain text or image"));
  }
  next();
});
