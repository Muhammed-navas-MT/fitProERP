import { MessageEntity } from "../../../../domain/entities/shared/messageEntity";
import { MessageStatus } from "../../../../domain/enums/messageStatus";
import { IMessageRepository } from "../../../interfaces/repository/shared/messageRepoInterface";
import { ISocketService } from "../../../interfaces/service/socketServiceInterface";
import { IMarkMessageSeenUseCase } from "../../../interfaces/useCase/shared/chatManagement/markMessageSeenUseCaseInterface";

export class MarkMessageSeenUseCase implements IMarkMessageSeenUseCase {
  constructor(
    private _messageRepository: IMessageRepository,
    private _socketService: ISocketService,
  ) {}

  async execute(messageId: string): Promise<MessageEntity> {
    const existingMessage = await this._messageRepository.findById(messageId);

    if (!existingMessage) {
      throw new Error("Message not found");
    }

    if (existingMessage.status === MessageStatus.SEEN) {
      return existingMessage;
    }

    const updatedMessage = await this._messageRepository.updateStatus(
      messageId,
      MessageStatus.SEEN,
      new Date(),
    );

    if (!updatedMessage) {
      throw new Error("Failed to update message status");
    }

    this._socketService.emitConversationSeen(updatedMessage.senderId, {
      conversationId: updatedMessage.conversationId,
      seenBy: updatedMessage.receiverId,
    });

    return updatedMessage;
  }
}
