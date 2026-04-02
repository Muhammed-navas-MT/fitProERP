import { ConversationEntity } from "../../../../domain/entities/shared/conversationEntity";
import { ChatUserModel } from "../../../../domain/enums/chatUserModel";
import { MessageType } from "../../../../domain/enums/messageType";
import { IPopulatedConversation } from "../../../../infrastructure/repository/databaseConfigs/types/populatedConversationType";
import { IBaseRepository } from "../base/baseRepo";

export interface IConversationRepository extends IBaseRepository<ConversationEntity> {
  createConversation(data: ConversationEntity): Promise<ConversationEntity>;

  findOneToOneConversation(
    firstUserId: string,
    firstUserModel: ChatUserModel,
    secondUserId: string,
    secondUserModel: ChatUserModel,
  ): Promise<ConversationEntity | null>;

  updateLastMessage(data: {
    conversationId: string;
    lastMessage?: string;
    lastMessageType: MessageType;
    lastMessageAt: Date;
  }): Promise<void>;
  findUserConversations(
    userId: string,
    userModel: ChatUserModel,
    page: number,
    limit: number,
  ): Promise<IPopulatedConversation[]>;

  countUserConversations(
    userId: string,
    userModel: ChatUserModel,
  ): Promise<number>;
  findOneToOneConversationByKey(
    conversationKey: string,
  ): Promise<ConversationEntity | null>;
}
