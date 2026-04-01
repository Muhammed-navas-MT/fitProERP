import { MessageEntity } from "../../../../domain/entities/shared/messageEntity";
import { MessageStatus } from "../../../../domain/enums/messageStatus";
import { IBaseRepository } from "../base/baseRepo";

export interface IMessageRepository extends IBaseRepository<MessageEntity> {
  findByConversationId(
    conversationId: string,
    page: number,
    limit: number,
  ): Promise<MessageEntity[]>;
  countByConversationId(conversationId: string): Promise<number>;
  updateStatus(
    messageId: string,
    status: MessageStatus,
    seenAt?: Date,
  ): Promise<MessageEntity | null>;
}
