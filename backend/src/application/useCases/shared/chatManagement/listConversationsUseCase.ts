import { ConversationEntity } from "../../../../domain/entities/shared/conversationEntity";
import { ListConversationsDto } from "../../../dtos/shared/messageDtos";
import { IConversationRepository } from "../../../interfaces/repository/shared/conversationRepository";
import { IMessageRepository } from "../../../interfaces/repository/shared/messageRepoInterface";
import { IListConversationsUseCase } from "../../../interfaces/useCase/shared/chatManagement/listConversationsUseCaseInterface";

export class ListConversationsUseCase implements IListConversationsUseCase {
  constructor(
    private _conversationRepository: IConversationRepository,
    private _messageRepository: IMessageRepository,
  ) {}

  async execute(data: ListConversationsDto): Promise<{
    conversations: ConversationEntity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const page = Number(data.page) || 1;
    const limit = Number(data.limit) || 20;

    const [conversations, total] = await Promise.all([
      this._conversationRepository.findUserConversations(
        data.userId,
        data.userModel,
        page,
        limit,
      ),
      this._conversationRepository.countUserConversations(
        data.userId,
        data.userModel,
      ),
    ]);

    const conversationsWithUnread = await Promise.all(
      conversations.map(async (conversation) => {
        const unreadCount =
          await this._messageRepository.countUnreadByConversation(
            conversation._id as string,
            data.userId,
          );

        return {
          ...conversation,
          unreadCount,
        };
      }),
    );

    return {
      conversations: conversationsWithUnread,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
