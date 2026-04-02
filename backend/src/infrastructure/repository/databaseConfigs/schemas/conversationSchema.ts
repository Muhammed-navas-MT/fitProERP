import { Schema } from "mongoose";
import { MessageType } from "../../../../domain/enums/messageType";
import { ChatUserModel } from "../../../../domain/enums/chatUserModel";

export const conversationSchema = new Schema(
  {
    conversationKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    members: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          required: true,
          refPath: "members.userModel",
        },
        userModel: {
          type: String,
          required: true,
          enum: Object.values(ChatUserModel),
        },
      },
    ],

    participants: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          required: true,
          refPath: "participants.userModel",
        },
        userModel: {
          type: String,
          required: true,
          enum: Object.values(ChatUserModel),
        },
        isOnline: {
          type: Boolean,
          default: false,
        },
        lastSeen: {
          type: Date,
        },
      },
    ],

    lastMessageId: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },

    lastMessage: {
      type: String,
      trim: true,
    },

    lastMessageType: {
      type: String,
      enum: Object.values(MessageType),
    },

    lastMessageAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

conversationSchema.pre("validate", function (next) {
  if (this.members.length !== 2) {
    return next(new Error("Conversation must contain exactly 2 members"));
  }
  next();
});
