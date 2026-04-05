import { ConversationEntity } from "../../../../domain/entities/shared/conversationEntity";
import { NotificationType } from "../../../../domain/enums/notificationTypes";
import { Roles } from "../../../../domain/enums/roles";
import { CreateConversationDto } from "../../../dtos/shared/messageDtos";
import { IConversationRepository } from "../../../interfaces/repository/shared/conversationRepository";
import { INotificationService } from "../../../interfaces/service/notificationServiceInterface";
import { ICreateConversationUseCase } from "../../../interfaces/useCase/shared/chatManagement/createConversationUseCaseInterface";

export class CreateConversationUseCase implements ICreateConversationUseCase {
  constructor(
    private _conversationRepository: IConversationRepository,
    private _notificationService: INotificationService,
  ) {}

  private buildConversationKey(data: CreateConversationDto): string {
    const first = `${data.firstUserModel}:${data.firstUserId}`;
    const second = `${data.secondUserModel}:${data.secondUserId}`;
    return [first, second].sort().join("_");
  }

  private mapUserModelToRole(userModel: string): Roles {
    switch (userModel) {
      case "Member":
        return Roles.MEMBER;
      case "Trainer":
        return Roles.TRAINER;
      case "GymAdmin":
        return Roles.GYMADMIN;
      case "SuperAdmin":
        return Roles.SUPERADMIN;
      default:
        throw new Error("Invalid user model");
    }
  }

  async execute(data: CreateConversationDto): Promise<ConversationEntity> {
    const { firstUserId, firstUserModel, secondUserId, secondUserModel } = data;

    if (!firstUserId || !secondUserId) {
      throw new Error("Both users are required");
    }

    if (firstUserId === secondUserId && firstUserModel === secondUserModel) {
      throw new Error("You cannot create conversation with same user");
    }

    const conversationKey = this.buildConversationKey(data);

    const existing =
      await this._conversationRepository.findOneToOneConversationByKey(
        conversationKey,
      );

    if (existing) {
      return existing;
    }

    const conversationData: ConversationEntity = {
      conversationKey,
      members: [
        {
          userId: firstUserId,
          userModel: firstUserModel,
        },
        {
          userId: secondUserId,
          userModel: secondUserModel,
        },
      ],
      participants: [
        {
          userId: firstUserId,
          userModel: firstUserModel,
          isOnline: false,
        },
        {
          userId: secondUserId,
          userModel: secondUserModel,
          isOnline: false,
        },
      ],
    };

    const conversation =
      await this._conversationRepository.createConversation(conversationData);

    await this._notificationService.notify({
      receiverId: secondUserId,
      receiverRole: this.mapUserModelToRole(secondUserModel),
      title: "New Conversation Started",
      message: "A new conversation has been started with you.",
      type: NotificationType.NEW_MESSAGE,
      relatedId: conversation._id?.toString(),
      relatedModel: "Conversation",
      actionLink: "/chat",
    });
    return conversation;
  }
}
