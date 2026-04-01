import { ConversationEntity } from "../../../../domain/entities/shared/conversationEntity";
import { MessageType } from "../../../../domain/enums/messageType";
import { IBaseRepository } from "../base/baseRepo";

export interface IConversationRepository extends IBaseRepository<ConversationEntity> {
  updateLastMessage(data: {
    conversationId: string;
    lastMessage?: string;
    lastMessageType: MessageType;
    lastMessageAt: Date;
  }): Promise<void>;
}
