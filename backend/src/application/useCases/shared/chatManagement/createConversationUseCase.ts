import { ConversationEntity } from "../../../../domain/entities/shared/conversationEntity";
import { CreateConversationDto } from "../../../dtos/shared/messageDtos";
import { IConversationRepository } from "../../../interfaces/repository/shared/conversationRepository";
import { ICreateConversationUseCase } from "../../../interfaces/useCase/shared/chatManagement/createConversationUseCaseInterface";

export class CreateConversationUseCase implements ICreateConversationUseCase {
  constructor(private _conversationRepository: IConversationRepository) {}

  private buildConversationKey(data: CreateConversationDto): string {
    const first = `${data.firstUserModel}:${data.firstUserId}`;
    const second = `${data.secondUserModel}:${data.secondUserId}`;
    return [first, second].sort().join("_");
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

    return await this._conversationRepository.createConversation(
      conversationData,
    );
  }
}
