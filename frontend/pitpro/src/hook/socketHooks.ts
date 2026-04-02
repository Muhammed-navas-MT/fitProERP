import { useEffect } from "react";
import { getSocket } from "@/lib/socket";
import type {
  ConversationSeenEvent,
  ConversationUpdatedEvent,
  ReceiveMessageEvent,
  TypingEvent,
} from "@/types/socketType";

interface UseChatSocketProps {
  conversationId?: string;
  onReceiveMessage?: (message: ReceiveMessageEvent) => void;
  onConversationUpdated?: (data: ConversationUpdatedEvent) => void;
  onConversationSeen?: (data: ConversationSeenEvent) => void;
  onUserTyping?: (data: TypingEvent) => void;
  onUserStopTyping?: (data: TypingEvent) => void;
}

export const useChatSocket = ({
  conversationId,
  onReceiveMessage,
  onConversationUpdated,
  onConversationSeen,
  onUserTyping,
  onUserStopTyping,
}: UseChatSocketProps) => {
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    if (conversationId) {
      socket.emit("conversation:join", conversationId);
    }

    if (onReceiveMessage) {
      socket.on("receive_message", onReceiveMessage);
    }

    if (onConversationUpdated) {
      socket.on("conversation_updated", onConversationUpdated);
    }

    if (onConversationSeen) {
      socket.on("conversation_seen", onConversationSeen);
    }

    if (onUserTyping) {
      socket.on("chat:user-typing", onUserTyping);
    }

    if (onUserStopTyping) {
      socket.on("chat:user-stop-typing", onUserStopTyping);
    }

    return () => {
      if (conversationId) {
        socket.emit("conversation:leave", conversationId);
      }

      if (onReceiveMessage) {
        socket.off("receive_message", onReceiveMessage);
      }

      if (onConversationUpdated) {
        socket.off("conversation_updated", onConversationUpdated);
      }

      if (onConversationSeen) {
        socket.off("conversation_seen", onConversationSeen);
      }

      if (onUserTyping) {
        socket.off("chat:user-typing", onUserTyping);
      }

      if (onUserStopTyping) {
        socket.off("chat:user-stop-typing", onUserStopTyping);
      }
    };
  }, [
    conversationId,
    onReceiveMessage,
    onConversationUpdated,
    onConversationSeen,
    onUserTyping,
    onUserStopTyping,
  ]);
};