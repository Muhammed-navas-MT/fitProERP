import { Model } from "mongoose";
import { IMessageRepository } from "../../../application/interfaces/repository/shared/messageRepoInterface";
import { BaseRepository } from "../base/baseRepo";
import { IMessageModel } from "../databaseConfigs/models/messageModel";
import { MessageEntity } from "../../../domain/entities/shared/messageEntity";
import { MessageStatus } from "../../../domain/enums/messageStatus";

export class MessageRepository
  extends BaseRepository<IMessageModel>
  implements IMessageRepository
{
  constructor(model: Model<IMessageModel>) {
    super(model);
  }
  async createMessage(data: MessageEntity): Promise<MessageEntity> {
    const created = await this._model.create(data);
    return created.toObject() as MessageEntity;
  }

  async findByConversationId(
    conversationId: string,
    page: number,
    limit: number,
  ): Promise<MessageEntity[]> {
    const skip = (page - 1) * limit;

    return await this._model
      .find({
        conversationId,
        isDeleted: { $ne: true },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean<MessageEntity[]>();
  }

  async countByConversationId(conversationId: string): Promise<number> {
    return await this._model.countDocuments({
      conversationId,
      isDeleted: { $ne: true },
    });
  }

  async updateStatus(
    messageId: string,
    status: MessageStatus,
    seenAt?: Date,
  ): Promise<MessageEntity | null> {
    return await this._model
      .findByIdAndUpdate(
        messageId,
        {
          $set: {
            status,
            seenAt,
            updatedAt: new Date(),
          },
        },
        { new: true },
      )
      .lean<MessageEntity | null>();
  }
  async markConversationMessagesSeen(
    conversationId: string,
    viewerId: string,
  ): Promise<number> {
    const result = await this._model.updateMany(
      {
        conversationId,
        receiverId: viewerId,
        status: { $ne: MessageStatus.SEEN },
        isDeleted: false,
      },
      {
        $set: {
          status: MessageStatus.SEEN,
          seenAt: new Date(),
          updatedAt: new Date(),
        },
      },
    );

    return result.modifiedCount || 0;
  }
  async countUnreadByConversation(
    conversationId: string,
    receiverId: string,
  ): Promise<number> {
    return this._model.countDocuments({
      conversationId,
      receiverId,
      status: { $ne: MessageStatus.SEEN },
      isDeleted: false,
    });
  }
}
