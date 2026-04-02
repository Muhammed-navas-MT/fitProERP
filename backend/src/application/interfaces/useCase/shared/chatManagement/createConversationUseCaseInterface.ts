import { ConversationEntity } from "../../../../../domain/entities/shared/conversationEntity";
import { CreateConversationDto } from "../../../../dtos/shared/messageDtos";

export interface ICreateConversationUseCase {
  execute(data: CreateConversationDto): Promise<ConversationEntity>;
}
