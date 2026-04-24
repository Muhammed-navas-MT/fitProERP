import { MessageEntity } from "../../../../../domain/entities/shared/messageEntity";
import { UploadMessageImageDto } from "../../../../dtos/shared/messageDtos";

export interface IUploadMessageImageUseCase {
  execute(data: UploadMessageImageDto): Promise<MessageEntity>;
}
