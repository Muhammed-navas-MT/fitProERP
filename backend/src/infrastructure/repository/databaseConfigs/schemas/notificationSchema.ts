import { Schema } from "mongoose";
import { Roles } from "../../../../domain/enums/roles";
import { NotificationType } from "../../../../domain/enums/notificationTypes";

export const notificationSchema = new Schema(
  {
    receiverId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "receiverRoleModel",
    },
    receiverRole: {
      type: String,
      enum: Object.values(Roles),
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    actionLink: {
      type: String,
    },
    relatedId: {
      type: Schema.Types.ObjectId,
    },
    relatedModel: {
      type: String,
    },
  },
  { timestamps: true },
);
