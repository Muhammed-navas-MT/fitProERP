import { ConversationEntity } from "../../../../../domain/entities/shared/conversationEntity";
import { ListConversationsDto } from "../../../../dtos/shared/messageDtos";

export interface IListConversationsUseCase {
  execute(data: ListConversationsDto): Promise<{
    conversations: ConversationEntity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
}
