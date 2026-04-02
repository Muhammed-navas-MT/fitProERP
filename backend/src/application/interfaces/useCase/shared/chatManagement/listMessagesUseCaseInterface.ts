import { MessageEntity } from "../../../../../domain/entities/shared/messageEntity";
import { ListMessagesDto } from "../../../../dtos/shared/messageDtos";

export interface IListMessagesUseCase {
  execute(data: ListMessagesDto): Promise<{
    messages: MessageEntity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
}
