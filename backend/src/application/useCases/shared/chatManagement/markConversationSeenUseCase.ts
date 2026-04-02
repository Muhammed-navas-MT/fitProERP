import { MarkConversationSeenDto } from "../../../dtos/shared/messageDtos";
import { IConversationRepository } from "../../../interfaces/repository/shared/conversationRepository";
import { IMessageRepository } from "../../../interfaces/repository/shared/messageRepoInterface";
import { ISocketService } from "../../../interfaces/service/socketServiceInterface";
import { IMarkConversationSeenUseCase } from "../../../interfaces/useCase/shared/chatManagement/markConversationSeenUseCase";

export class MarkConversationSeenUseCase implements IMarkConversationSeenUseCase {
  constructor(
    private _messageRepository: IMessageRepository,
    private _conversationRepository: IConversationRepository,
    private _socketService: ISocketService,
  ) {}

  async execute(
    data: MarkConversationSeenDto,
  ): Promise<{ updatedCount: number }> {
    const conversation = await this._conversationRepository.findById(
      data.conversationId,
    );

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    const isMember = conversation.members.some(
      (member) => member.userId.toString() === data.viewerId,
    );

    if (!isMember) {
      throw new Error("Unauthorized conversation access");
    }

    const sender = conversation.members.find(
      (member) => member.userId.toString() !== data.viewerId,
    );

    const updatedCount =
      await this._messageRepository.markConversationMessagesSeen(
        data.conversationId,
        data.viewerId,
      );

    if (sender && updatedCount > 0) {
      this._socketService.emitConversationSeen(sender.userId, {
        conversationId: data.conversationId,
        seenBy: data.viewerId,
      });
    }

    return { updatedCount };
  }
}
