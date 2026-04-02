import { MessageEntity } from "../../../../domain/entities/shared/messageEntity";
import { ChatUserModel } from "../../../../domain/enums/chatUserModel";
import { ListMessagesDto } from "../../../dtos/shared/messageDtos";
import { IConversationRepository } from "../../../interfaces/repository/shared/conversationRepository";
import { IMessageRepository } from "../../../interfaces/repository/shared/messageRepoInterface";
import { IListMessagesUseCase } from "../../../interfaces/useCase/shared/chatManagement/listMessagesUseCaseInterface";

export class ListMessagesUseCase implements IListMessagesUseCase {
  constructor(
    private _messageRepository: IMessageRepository,
    private _conversationRepository: IConversationRepository,
  ) {}

  async execute(
    data: ListMessagesDto & {
      currentUserId?: string;
      currentUserModel?: ChatUserModel;
    },
  ): Promise<{
    messages: MessageEntity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const page = Number(data.page) || 1;
    const limit = Number(data.limit) || 20;

    if (data.currentUserId && data.currentUserModel) {
      const conversation = await this._conversationRepository.findById(
        data.conversationId,
      );

      if (!conversation) {
        throw new Error("Conversation not found");
      }

      const isSenderMember = conversation.members.some(
        (member) =>
          member.userId === data.currentUserId &&
          member.userModel === data.currentUserModel,
      );

      if (!isSenderMember) {
        throw new Error("Unauthorized conversation access");
      }
    }

    const [messages, total] = await Promise.all([
      this._messageRepository.findByConversationId(
        data.conversationId,
        page,
        limit,
      ),
      this._messageRepository.countByConversationId(data.conversationId),
    ]);

    return {
      messages,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
