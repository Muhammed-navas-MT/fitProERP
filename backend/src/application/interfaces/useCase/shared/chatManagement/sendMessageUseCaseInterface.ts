import { MessageEntity } from "../../../../../domain/entities/shared/messageEntity";
import { CreateMessageDto } from "../../../../dtos/shared/messageDtos";

export interface ISendMessageUseCase {
  execute(data: CreateMessageDto): Promise<MessageEntity>;
}
