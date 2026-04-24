import {
  BadRequestException,
  ForbiddenException,
  NOtFoundException,
} from "../../../constants/exceptions";
import { UploadMessageImageDto } from "../../../dtos/shared/messageDtos";
import { MessageEntity } from "../../../../domain/entities/shared/messageEntity";
import { MessageStatus } from "../../../../domain/enums/messageStatus";
import { MessageType } from "../../../../domain/enums/messageType";
import { IConversationRepository } from "../../../interfaces/repository/shared/conversationRepository";
import { IMessageRepository } from "../../../interfaces/repository/shared/messageRepoInterface";
import { ISocketService } from "../../../interfaces/service/socketServiceInterface";
import { IUploadMessageImageUseCase } from "../../../interfaces/useCase/shared/chatManagement/uploadMessageImageUseCaseInterface";

export class UploadMessageImageUseCase implements IUploadMessageImageUseCase {
  constructor(
    private _messageRepository: IMessageRepository,
    private _conversationRepository: IConversationRepository,
    private _socketService: ISocketService,
  ) {}

  async execute(data: UploadMessageImageDto): Promise<MessageEntity> {
    const hasImage = !!data.imageUrl?.trim();
    const hasText = !!data.text?.trim();

    if (!data.conversationId?.trim()) {
      throw new BadRequestException("Conversation id is required");
    }

    if (!data.receiverId?.trim()) {
      throw new BadRequestException("Receiver id is required");
    }

    if (!hasImage) {
      throw new BadRequestException("Image URL is required");
    }

    const conversation = await this._conversationRepository.findById(
      data.conversationId,
    );

    if (!conversation) {
      throw new NOtFoundException("Conversation not found");
    }

    const isSenderInConversation = conversation.members.some(
      (member) =>
        member.userId.toString() === data.senderId &&
        member.userModel === data.senderModel,
    );

    if (!isSenderInConversation) {
      throw new ForbiddenException("Unauthorized conversation access");
    }

    const isReceiverInConversation = conversation.members.some(
      (member) =>
        member.userId.toString() === data.receiverId &&
        member.userModel === data.receiverModel,
    );

    if (!isReceiverInConversation) {
      throw new BadRequestException(
        "Receiver is not a participant of this conversation",
      );
    }

    const message: MessageEntity = {
      conversationId: data.conversationId,
      senderId: data.senderId,
      senderModel: data.senderModel,
      receiverId: data.receiverId,
      receiverModel: data.receiverModel,
      text: hasText ? data.text!.trim() : undefined,
      imageUrl: data.imageUrl.trim(),
      type: MessageType.IMAGE,
      status: MessageStatus.SENT,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const createdMessage = await this._messageRepository.createMessage(message);

    await this._conversationRepository.updateLastMessage({
      conversationId: data.conversationId,
      lastMessage: hasText ? data.text!.trim() : "📷 Image",
      lastMessageType: MessageType.IMAGE,
      lastMessageAt: createdMessage.createdAt || new Date(),
    });

    this._socketService.emitReceiveMessage(
      data.conversationId,
      data.receiverId,
      createdMessage,
    );

    this._socketService.emitConversationUpdated(data.receiverId, {
      conversationId: data.conversationId,
      lastMessage: hasText ? data.text!.trim() : "📷 Image",
      lastMessageType: MessageType.IMAGE,
      lastMessageAt: (createdMessage.createdAt || new Date()).toISOString(),
      senderId: data.senderId,
    });

    return createdMessage;
  }
}
