import { MessageEntity } from "../../../../domain/entities/shared/messageEntity";
import { MessageStatus } from "../../../../domain/enums/messageStatus";
import { MessageType } from "../../../../domain/enums/messageType";
import { CreateMessageDto } from "../../../dtos/shared/messageDtos";
import { IConversationRepository } from "../../../interfaces/repository/shared/conversationRepository";
import { IMessageRepository } from "../../../interfaces/repository/shared/messageRepoInterface";
import { ISocketService } from "../../../interfaces/service/socketServiceInterface";
import { ISendMessageUseCase } from "../../../interfaces/useCase/shared/chatManagement/sendMessageUseCaseInterface";

export class SendMessageUseCase implements ISendMessageUseCase {
  constructor(
    private _messageRepository: IMessageRepository,
    private _conversationRepository: IConversationRepository,
    private _socketService: ISocketService,
  ) {}

  async execute(data: CreateMessageDto): Promise<MessageEntity> {
    const hasText = !!data.text?.trim();
    const hasImage = !!data.imageUrl?.trim();
    console.log(data, "in message send use case");

    if (!hasText && !hasImage) {
      throw new Error("Message content is required");
    }

    if (data.type === MessageType.TEXT && !hasText) {
      throw new Error("Text is required for text message");
    }

    if (data.type === MessageType.IMAGE && !hasImage) {
      throw new Error("Image URL is required for image message");
    }
    const conversation = await this._conversationRepository.findById(
      data.conversationId,
    );
    console.log(conversation);

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    const isSenderMember = conversation.members.some(
      (member) =>
        member.userId.toString() === data.senderId &&
        member.userModel === data.senderModel,
    );

    console.log(isSenderMember);

    if (!isSenderMember) {
      throw new Error("Unauthorized conversation access");
    }

    const message: MessageEntity = {
      conversationId: data.conversationId,
      senderId: data.senderId,
      receiverId: data.receiverId,
      receiverModel: data.receiverModel,
      senderModel: data.senderModel,
      text: data.text?.trim() || undefined,
      imageUrl: data.imageUrl?.trim() || undefined,
      type: data.type,
      status: MessageStatus.SENT,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log(message);

    const createdMessage = await this._messageRepository.createMessage(message);

    await this._conversationRepository.updateLastMessage({
      conversationId: data.conversationId,
      lastMessage:
        data.type === MessageType.IMAGE
          ? data.text?.trim() || "📷 Image"
          : data.text?.trim(),
      lastMessageType: data.type,
      lastMessageAt: createdMessage.createdAt || new Date(),
    });

    this._socketService.emitReceiveMessage(
      data.conversationId,
      data.receiverId,
      createdMessage,
    );

    this._socketService.emitConversationUpdated(data.receiverId, {
      conversationId: data.conversationId,
      lastMessage:
        data.type === MessageType.IMAGE
          ? data.text?.trim() || "📷 Image"
          : data.text?.trim(),
      lastMessageType: data.type,
      lastMessageAt: (createdMessage.createdAt || new Date()).toISOString(),
      senderId: data.senderId,
    });

    return createdMessage;
  }
}
