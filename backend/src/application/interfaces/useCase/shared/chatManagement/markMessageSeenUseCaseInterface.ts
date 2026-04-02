import { MessageEntity } from "../../../../../domain/entities/shared/messageEntity";

export interface IMarkMessageSeenUseCase {
  execute(messageId: string): Promise<MessageEntity>;
}
