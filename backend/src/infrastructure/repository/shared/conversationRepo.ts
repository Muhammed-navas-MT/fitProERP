import { Model } from "mongoose";
import { IConversationRepository } from "../../../application/interfaces/repository/shared/conversationRepository";
import { MessageType } from "../../../domain/enums/messageType";
import { BaseRepository } from "../base/baseRepo";
import { IConversationModel } from "../databaseConfigs/models/conversationModel";
import { ConversationEntity } from "../../../domain/entities/shared/conversationEntity";
import { ChatUserModel } from "../../../domain/enums/chatUserModel";

export class ConversationRepository
  extends BaseRepository<IConversationModel>
  implements IConversationRepository
{
  constructor(model: Model<IConversationModel>) {
    super(model);
  }
  async createConversation(
    data: ConversationEntity,
  ): Promise<ConversationEntity> {
    const created = await this._model.create(data);
    return created.toObject();
  }

  async findOneToOneConversation(
    firstUserId: string,
    firstUserModel: ChatUserModel,
    secondUserId: string,
    secondUserModel: ChatUserModel,
  ): Promise<ConversationEntity | null> {
    const conversation = await this._model
      .findOne({
        members: {
          $all: [
            {
              $elemMatch: {
                userId: firstUserId,
                userModel: firstUserModel,
              },
            },
            {
              $elemMatch: {
                userId: secondUserId,
                userModel: secondUserModel,
              },
            },
          ],
        },
      })
      .lean<IConversationModel | null>();

    if (!conversation) return null;
    return conversation;
  }
  async findOneToOneConversationByKey(
    conversationKey: string,
  ): Promise<ConversationEntity | null> {
    const conversation = await this._model.findOne({ conversationKey }).lean();

    if (!conversation) return null;

    return conversation;
  }

  async findUserConversations(
    userId: string,
    userModel: ChatUserModel,
    page: number,
    limit: number,
  ): Promise<ConversationEntity[]> {
    const skip = (page - 1) * limit;

    const conversations = await this._model
      .find({
        participants: {
          $elemMatch: {
            userId,
            userModel,
          },
        },
      })
      .sort({ lastMessageAt: -1, updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return conversations;
  }

  async countUserConversations(
    userId: string,
    userModel: ChatUserModel,
  ): Promise<number> {
    return this._model.countDocuments({
      participants: {
        $elemMatch: {
          userId,
          userModel,
        },
      },
    });
  }

  async updateLastMessage(data: {
    conversationId: string;
    lastMessageId: string;
    lastMessage?: string;
    lastMessageType: MessageType;
    lastMessageAt: Date;
  }): Promise<void> {
    await this._model.findByIdAndUpdate(data.conversationId, {
      $set: {
        lastMessageId: data.lastMessageId,
        lastMessage: data.lastMessage,
        lastMessageType: data.lastMessageType,
        lastMessageAt: data.lastMessageAt,
        updatedAt: new Date(),
      },
    });
  }
}
