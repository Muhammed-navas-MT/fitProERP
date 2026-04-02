import { MarkConversationSeenDto } from "../../../../dtos/shared/messageDtos";

export interface IMarkConversationSeenUseCase {
  execute(data: MarkConversationSeenDto): Promise<{ updatedCount: number }>;
}
