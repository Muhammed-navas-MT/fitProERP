import { ISocketService } from "../../application/interfaces/service/socketServiceInterface";
import { MessageEntity } from "../../domain/entities/shared/messageEntity";
import { SocketRooms } from "./socketRoom";
import { getIO } from "./socketServer";

export class SocketService implements ISocketService {
  emitReceiveMessage(
    conversationId: string,
    receiverId: string,
    message: MessageEntity,
  ): void {
    const io = getIO();

    io.to(SocketRooms.conversation(conversationId)).emit(
      "receive_message",
      message,
    );

    io.to(SocketRooms.user(receiverId)).emit("conversation_message", {
      conversationId,
      message,
    });
  }

  emitConversationUpdated(
    receiverId: string,
    payload: {
      conversationId: string;
      lastMessage?: string;
      lastMessageType: string;
      lastMessageAt: string;
      senderId: string;
    },
  ): void {
    const io = getIO();
    io.to(SocketRooms.user(receiverId)).emit("conversation_updated", payload);
  }

  emitConversationSeen(
    senderId: string,
    payload: {
      conversationId: string;
      seenBy: string;
    },
  ): void {
    const io = getIO();
    io.to(SocketRooms.user(senderId)).emit("conversation_seen", payload);
  }
}
