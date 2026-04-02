import { IPopulatedConversation } from "../../infrastructure/repository/databaseConfigs/types/populatedConversationType";
import { ListConverSationsResponseDto } from "../dtos/shared/messageDtos";

export class ConversationMapper {
  static toListConversationResponse(
    conversations: IPopulatedConversation[],
    total: number,
    page: number,
    limit: number,
  ): ListConverSationsResponseDto {
    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),

      conversations: conversations.map((conversation) => ({
        _id: conversation._id!,
        conversationKey: conversation.conversationKey,

        members: conversation.members.map((member) => ({
          userId:
            typeof member.userId === "object"
              ? member.userId._id
              : member.userId,

          userModel: member.userModel,

          name:
            typeof member.userId === "object" ? member.userId.name : "Unknown",
        })),

        participants: conversation.participants.map((p) => ({
          userId: p.userId,
          userModel: p.userModel,
          isOnline: p.isOnline,
          lastSeen: p.lastSeen,
        })),

        lastMessageId: conversation.lastMessageId,
        lastMessage: conversation.lastMessage,
        lastMessageType: conversation.lastMessageType,
        lastMessageAt: conversation.lastMessageAt,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
      })),
    };
  }
}
